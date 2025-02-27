"use client";

import ActionsMenu from "@/components/ActionsMenu";
import Header from "@/components/Header";
import ListCampaigns from "@/components/ListCampaigns";
import { CampaignProvider } from "@/context/CampaignContext";

const Home = () => {
  return (
    <CampaignProvider>
      <div className="container mx-auto bg-white dark:bg-[#0a0a0a] pb-20">
        <Header />
        <ActionsMenu />
        <ListCampaigns />
      </div>
    </CampaignProvider>
  );
};

export default Home;
