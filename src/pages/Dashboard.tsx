import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Logo } from "@/components/Logo";
import { Pencil, Trash2, Sparkles, LogOut, X, Copy, Loader2 } from "lucide-react";

interface WorkLog {
  id: string;
  project_name: string;
  entry_date: string;
  skills: string;
  problem: string;
  result: string;
  quantifiable_result: string | null;
  created_at: string;
}

const emptyForm = {
  project_name: "",
  entry_date: new Date().toISOString().slice(0, 10),
  skills: "",
  problem: "",
  result: "",
  quantifiable_result: "",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState<WorkLog[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // CV bullet dialog state
  const [bulletDialogOpen, setBulletDialogOpen] = useState(false);
  const [bulletLoading, setBulletLoading] = useState(false);
  const [bulletText, setBulletText] = useState("");
  const [activeLog, setActiveLog] = useState<WorkLog | null>(null);
  const [needsQuant, setNeedsQuant] = useState(false);
  const [quantQuestion, setQuantQuestion] = useState("");
  const [quantAnswer, setQuantAnswer] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/auth", { replace: true });
      else setUserEmail(session.user.email ?? "");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/auth", { replace: true });
      else {
        setUserEmail(session.user.email ?? "");
        fetchLogs();
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from("work_logs")
      .select("*")
      .order("entry_date", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) toast({ title: "Error loading", description: error.message, variant: "destructive" });
    else setLogs(data ?? []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
      if (editingId) {
        const { error } = await supabase.from("work_logs").update(form).eq("id", editingId);
        if (error) throw error;
        toast({ title: "Imprint updated" });
      } else {
        const { error } = await supabase.from("work_logs").insert({ ...form, user_id: user.id });
        if (error) throw error;
        toast({ title: "Imprint saved" });
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchLogs();
    } catch (err: any) {
      toast({ title: "Save failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (log: WorkLog) => {
    setEditingId(log.id);
    setForm({
      project_name: log.project_name,
      entry_date: log.entry_date,
      skills: log.skills,
      problem: log.problem,
      result: log.result,
      quantifiable_result: log.quantifiable_result ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this imprint?")) return;
    const { error } = await supabase.from("work_logs").delete().eq("id", id);
    if (error) toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Imprint deleted" });
      fetchLogs();
    }
  };

  const callBulletFunction = async (log: WorkLog, quantOverride?: string) => {
    setBulletLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-cv-bullet", {
        body: {
          project_name: log.project_name,
          skills: log.skills,
          problem: log.problem,
          result: log.result,
          quantifiable_result: quantOverride ?? log.quantifiable_result ?? "",
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data?.needs_quantification) {
        setNeedsQuant(true);
        setQuantQuestion(data.question || "Can you share a specific number, %, time saved, or scale?");
        setBulletText("");
      } else {
        setNeedsQuant(false);
        setBulletText(data?.bullet ?? "");
      }
    } catch (err: any) {
      toast({ title: "Generation failed", description: err.message, variant: "destructive" });
      setBulletDialogOpen(false);
    } finally {
      setBulletLoading(false);
    }
  };

  const handleGenerateBullet = async (log: WorkLog) => {
    setActiveLog(log);
    setBulletText("");
    setQuantAnswer("");
    setNeedsQuant(false);
    setQuantQuestion("");
    setBulletDialogOpen(true);
    await callBulletFunction(log);
  };

  const handleSubmitQuant = async () => {
    if (!activeLog || !quantAnswer.trim()) return;
    // Persist back to the log so future generations have it
    const { error } = await supabase
      .from("work_logs")
      .update({ quantifiable_result: quantAnswer.trim() })
      .eq("id", activeLog.id);
    if (!error) {
      setActiveLog({ ...activeLog, quantifiable_result: quantAnswer.trim() });
      fetchLogs();
    }
    await callBulletFunction(activeLog, quantAnswer.trim());
  };

  const copyBullet = () => {
    navigator.clipboard.writeText(bulletText);
    toast({ title: "Copied to clipboard" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const truncate = (text: string, n = 140) => (text.length > n ? text.slice(0, n) + "…" : text);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-xl sticky top-0 z-40">
        <nav className="container flex items-center justify-between h-16">
          <Link to="/"><Logo /></Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">{userEmail}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </nav>
      </header>

      <div className="container py-10 space-y-12">
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit imprint" : "Add a new imprint"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="project_name">Project name</Label>
                <Input id="project_name" required value={form.project_name}
                  onChange={(e) => setForm({ ...form, project_name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entry_date">Date</Label>
                <Input id="entry_date" type="date" required value={form.entry_date}
                  onChange={(e) => setForm({ ...form, entry_date: e.target.value })} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="skills">Skills used (comma separated)</Label>
                <Input id="skills" required placeholder="React, TypeScript, Postgres" value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="problem">Problem solved</Label>
                <Textarea id="problem" required rows={3} value={form.problem}
                  onChange={(e) => setForm({ ...form, problem: e.target.value })} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="result">Result / outcome</Label>
                <Textarea id="result" required rows={3} value={form.result}
                  onChange={(e) => setForm({ ...form, result: e.target.value })} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="quantifiable_result">
                  Quantifiable result <span className="text-muted-foreground">(number, %, time, scale)</span>
                </Label>
                <Input
                  id="quantifiable_result"
                  placeholder="e.g. Reduced load time by 42% / Saved 8 hrs per week / Drove $120k in new revenue"
                  value={form.quantifiable_result}
                  onChange={(e) => setForm({ ...form, quantifiable_result: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  A strong bullet point needs a number. Add one now or the AI will ask later.
                </p>
              </div>
              <div className="md:col-span-2 flex gap-3">
                <Button type="submit" variant="hero" disabled={loading}>
                  {loading ? "Saving..." : editingId ? "Update imprint" : "Save imprint"}
                </Button>
                {editingId && (
                  <Button type="button" variant="ghost" onClick={cancelEdit}>
                    <X className="w-4 h-4" /> Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-2xl font-bold mb-6">Your Imprints</h2>
          {logs.length === 0 ? (
            <p className="text-muted-foreground">No imprints yet. Add your first one above.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {logs.map((log) => (
                <article
                  key={log.id}
                  className="bg-card text-card-foreground rounded-2xl shadow-sm border border-transparent hover:border-border transition-all p-4 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{log.project_name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(log.entry_date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleEdit(log)} aria-label="Edit">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleDelete(log.id)} aria-label="Delete">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {log.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s, i) => (
                      <Badge key={i} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                  <div className="text-sm space-y-2">
                    <p><span className="font-medium">Problem:</span> {truncate(log.problem)}</p>
                    <p><span className="font-medium">Result:</span> {truncate(log.result)}</p>
                    {log.quantifiable_result && (
                      <p><span className="font-medium">Impact:</span> {truncate(log.quantifiable_result)}</p>
                    )}
                  </div>
                  <Button variant="glass" size="sm" className="mt-auto" onClick={() => handleGenerateBullet(log)}>
                    <Sparkles className="w-4 h-4" /> Generate CV bullet
                  </Button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <Dialog open={bulletDialogOpen} onOpenChange={setBulletDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" /> AI-generated CV bullet
            </DialogTitle>
            <DialogDescription>
              {activeLog?.project_name}
            </DialogDescription>
          </DialogHeader>

          {bulletLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground py-8 justify-center">
              <Loader2 className="w-4 h-4 animate-spin" /> Crafting your bullet…
            </div>
          ) : needsQuant ? (
            <div className="space-y-3">
              <p className="text-sm">{quantQuestion}</p>
              <Textarea
                rows={3}
                placeholder="e.g. Reduced API latency by 38% across 12k daily users"
                value={quantAnswer}
                onChange={(e) => setQuantAnswer(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                We'll save this to your imprint so you don't have to type it again.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-relaxed">
              {bulletText}
            </div>
          )}

          <DialogFooter className="gap-2">
            {needsQuant ? (
              <Button onClick={handleSubmitQuant} disabled={!quantAnswer.trim() || bulletLoading} variant="hero">
                Generate bullet
              </Button>
            ) : (
              !bulletLoading && bulletText && (
                <>
                  <Button variant="ghost" onClick={() => activeLog && callBulletFunction(activeLog)}>
                    <Sparkles className="w-4 h-4" /> Regenerate
                  </Button>
                  <Button onClick={copyBullet} variant="hero">
                    <Copy className="w-4 h-4" /> Copy
                  </Button>
                </>
              )
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Dashboard;
