export const stats = [
  { label: "Similar Companies Found", value: "1,284", change: "+12%", status: "success" },
  { label: "Decision Makers Extracted", value: "856", change: "+5%", status: "processing" },
  { label: "Emails Verified", value: "742", change: "+18%", status: "success" },
  { label: "Outreach Sent", value: "620", change: "+24%", status: "success" },
];

export const kpis = [
  { title: "Lead Conversion Rate", value: "4.8%", color: "#FF6B00" },
  { title: "Emails Sent", value: "12.4k", color: "#A3A3A3" },
  { title: "Open Rate", value: "62.1%", color: "#FF6B00" },
  { title: "Reply Rate", value: "12.4%", color: "#FF6B00" },
];

export const leads = [
  {
    id: 1,
    company: "Acme Corp",
    name: "John Doe",
    position: "CEO",
    linkedin: "linkedin.com/in/johndoe",
    email: "john@acme.com",
    status: "Sent",
  },
  {
    id: 2,
    company: "Globex",
    name: "Jane Smith",
    position: "CTO",
    linkedin: "linkedin.com/in/janesmith",
    email: "jane@globex.io",
    status: "Replied",
  },
  {
    id: 3,
    company: "Soylent Corp",
    name: "David Miller",
    position: "VP Sales",
    linkedin: "linkedin.com/in/davidmiller",
    email: "david@soylent.com",
    status: "Interested",
  },
  {
    id: 4,
    company: "Initech",
    name: "Bill Lumbergh",
    position: "Manager",
    linkedin: "linkedin.com/in/billlumbergh",
    email: "bill@initech.com",
    status: "Failed",
  },
  {
    id: 5,
    company: "Umbrella Corp",
    name: "Albert Wesker",
    position: "Director",
    linkedin: "linkedin.com/in/albertwesker",
    email: "wesker@umbrella.com",
    status: "Processing",
  },
];

export const chartData = [
  { name: "Mon", sent: 400, replies: 24 },
  { name: "Tue", sent: 300, replies: 18 },
  { name: "Wed", sent: 500, replies: 35 },
  { name: "Thu", sent: 450, replies: 28 },
  { name: "Fri", sent: 600, replies: 42 },
  { name: "Sat", sent: 200, replies: 10 },
  { name: "Sun", sent: 150, replies: 8 },
];

export const pipelineSteps = [
  { id: "domain", label: "Company Domain", icon: "Globe" },
  { id: "ocean", label: "Ocean.io", icon: "Search" },
  { id: "prospeo", label: "Prospeo", icon: "Users" },
  { id: "eazyreach", label: "Eazyreach", icon: "Mail" },
  { id: "brevo", label: "Brevo", icon: "Send" },
  { id: "sent", label: "Emails Sent", icon: "CheckCircle" },
];
