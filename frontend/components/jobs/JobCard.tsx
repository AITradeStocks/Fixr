import { Card } from "@/components/ui/Card";

export function JobCard({ job }: { job: { description: string; status: string; quotedPrice: number } }) {
  return (
    <Card className="p-4">
      <div className="font-medium text-slate-950">{job.description}</div>
      <div className="mt-1 text-sm text-slate-500">Status: {job.status}</div>
      <div className="mt-3 text-lg font-semibold text-slate-950">${job.quotedPrice}</div>
    </Card>
  );
}
