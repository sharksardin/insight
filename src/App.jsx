import React from 'react';
import DeathHeatmap from './components/DeathHeatmap';
import PlayerHealthCurve from './components/PlayerHealthCurve';
import CombatTimeHistogram from './components/CombatTimeHistogram';

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">게임 분석 대시보드 (Vite)</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-2">사망 위치 히트맵</h2>
            <div className="h-64 bg-gray-700 rounded">
              <DeathHeatmap />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-2">플레이어 체력 곡선 평균</h2>
            <div className="h-64 bg-gray-700 rounded">
              <PlayerHealthCurve />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold mb-2">전투 시간 분포 (히스토그램)</h2>
            <div className="h-64 bg-gray-700 rounded">
              <CombatTimeHistogram />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;