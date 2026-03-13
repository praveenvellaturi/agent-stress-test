const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// 10 Domains for 10 Agents
const domains = [
  {
    sector: "Finance",
    name: "WallStreet-Bot",
    keys: ["ledger", "portfolio", "arbitrage", "compliance"],
  },
  {
    sector: "Healthcare",
    name: "MediScan-AI",
    keys: ["triage", "radiology", "pharmacy", "vitals"],
  },
  {
    sector: "Cybersecurity",
    name: "Sentinel-Prime",
    keys: ["firewall", "encryption", "threat", "breach"],
  },
  {
    sector: "Logistics",
    name: "SupplyChain-Go",
    keys: ["inventory", "freight", "manifest", "dock"],
  },
  {
    sector: "E-commerce",
    name: "Retail-Flow",
    keys: ["cart", "sku", "checkout", "loyalty"],
  },
  {
    sector: "Legal",
    name: "Counsel-GPT",
    keys: ["deposition", "litigation", "statute", "notary"],
  },
  {
    sector: "Education",
    name: "EduPulse",
    keys: ["curriculum", "grading", "enrollment", "tutor"],
  },
  {
    sector: "RealEstate",
    name: "PropTech-OS",
    keys: ["escrow", "appraisal", "listing", "zoning"],
  },
  {
    sector: "Marketing",
    name: "AdEngine",
    keys: ["campaign", "conversion", "retargeting", "funnel"],
  },
  {
    sector: "DevOps",
    name: "CloudStack",
    keys: ["container", "pipeline", "latency", "node"],
  },
];

const generateSkills = (agentName, sector, keys, count) => {
  return Array.from({ length: count }, (_, i) => {
    const category = i % 2 === 0 ? "Automation" : "Knowledge";
    const key = keys[i % keys.length];
    return {
      skill_id: `skill_${sector.toLowerCase().substring(0, 3)}_${i + 1}`,
      name: `${key.toUpperCase()} Module ${i + 1}`,
      description: `A ${category} capability for ${sector} systems handling ${key} resolution protocols.`,
      example_phrases: [
        `Analyze the ${key} status for ${agentName}`,
        `Trigger ${category} for ${key} sequence ${i + 1}`,
        `How does ${agentName} handle ${key} errors?`,
      ],
      category: category,
      metadata: {
        complexity: (i % 5) + 1,
        priority: i > 50 ? "High" : "Standard",
      },
    };
  });
};

// API Endpoint to get all agents and their 1000 skills
app.get("/api/agents1", (req, res) => {
  const agents = domains.map((d, index) => ({
    agent_id: `agent_${index + 1}`,
    agent_name: d.name,
    domain: d.sector,
    skill_count: 100,
    skills: generateSkills(d.name, d.sector, d.keys, 100),
  }));

  res.json({
    success: true,
    total_agents: agents.length,
    total_skills: agents.length * 100,
    data: agents,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
