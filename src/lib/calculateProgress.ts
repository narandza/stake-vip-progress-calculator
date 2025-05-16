type VIPLevel = {
    name: string;
    wagererRequired: number;
}

const VIP_TIERS: VIPLevel = [{
 { name: "Bronze", wagererRequired: 10 },
  { name: "Silver", wagererRequired: 2500 },
  { name: "Gold", wagererRequired: 10000 },
  { name: "Platinum I", wagererRequired: 25000 },
  { name: "Platinum II", wagererRequired: 50000 },
  { name: "Platinum III", wagererRequired: 100000 },
  { name: "Platinum IV", wagererRequired: 250000 },
  { name: "Platinum V", wagererRequired: 500000 },
  { name: "Diamond", wagererRequired: 1000000 },
}]