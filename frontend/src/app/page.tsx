"use client";

import { useEffect } from "react";
import { useCrowdStore } from "@/store/useCrowdStore";
import StadiumMap from "@/components/StadiumMap";
import AlertBanner from "@/components/AlertBanner";
import QuickActions from "@/components/QuickActions";
import StatusCards from "@/components/StatusCards";
import { Activity } from "lucide-react";

export default function Home() {
  const { connect, disconnect, isConnected } = useCrowdStore();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <div className="min-h-screen bg-background flex justify-center items-start pt-0 sm:pt-8 pb-8 px-0 sm:px-8">
      <main className="w-full max-w-6xl bg-[#0a0a0a] sm:rounded-[40px] sm:border border-white/10 sm:shadow-2xl overflow-hidden min-h-screen sm:min-h-[850px] relative flex flex-col pb-8">
        
        {/* Dynamic Background Blurs */}
        <div className="absolute top-0 left-[-20%] w-[120%] h-64 bg-accent/30 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-0 right-[-20%] w-[120%] h-64 bg-alertRed/20 blur-[120px] pointer-events-none z-0" />

        {/* Header */}
        <header className="z-10 flex items-center justify-between p-5 glass-panel sticky top-0 border-b border-white/5 bg-[#0a0a0a]/60">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-accent/20 rounded-xl">
              <Activity className="text-accent w-5 h-5" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-white">CrowdFlow</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${isConnected ? 'bg-alertGreen text-alertGreen animate-pulse' : 'bg-alertRed text-alertRed'}`} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">Live</span>
          </div>
        </header>

        <div className="px-4 mt-4 z-10">
          <AlertBanner />
        </div>

        <section className="z-10 p-4 flex-1 overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Map Column */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div className="space-y-3">
                <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest pl-1">Venue Map</h2>
                <div className="w-full bg-gradient-to-b from-[#111] to-[#0a0a0a] rounded-3xl border border-white/5 overflow-hidden relative shadow-inner p-4 ring-1 ring-white/5 flex items-center justify-center min-h-[400px]">
                  <StadiumMap />
                </div>
              </div>

              <QuickActions />
            </div>

            {/* Sidebar Status Column */}
            <div className="lg:col-span-1">
              <StatusCards />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto text-center pb-6 z-10 flex items-center justify-center gap-3 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          <span>Created by <span className="text-gray-300">Pratipalsinh Jadeja</span></span>
          <span className="text-gray-700">•</span>
          <a href="https://www.linkedin.com/in/pratipalsinh" target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:text-white transition-colors flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            LinkedIn
          </a>
        </footer>
      </main>
    </div>
  );
}
