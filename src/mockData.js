import { faker } from '@faker-js/faker';

// 1. 사망 위치 히트맵 데이터 생성
export const generateHeatmapData = (count = 500) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      x: faker.number.int({ min: 0, max: 100 }), // 맵의 X 좌표
      y: faker.number.int({ min: 0, max: 100 }), // 맵의 Y 좌표
      value: faker.number.int({ min: 1, max: 5 }), // 해당 위치의 사망 횟수
    });
  }
  return data;
};

// 2. 플레이어 체력 곡선 데이터 생성
export const generateHealthCurveData = (points = 30) => {
  let lastHealth = 100;
  const data = [];
  const labels = [];
  for (let i = 0; i < points; i++) {
    const healthChange = faker.number.int({ min: -20, max: 5 });
    lastHealth += healthChange;
    if (lastHealth > 100) lastHealth = 100;
    if (lastHealth < 0) lastHealth = 0;
    data.push(lastHealth);
    labels.push(`Time ${i + 1}`);
  }
  return { labels, data };
};

// 3. 전투 시간 분포 데이터 생성
export const generateCombatTimeData = (count = 200) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    // 전투 시간을 초 단위로 생성 (예: 10초 ~ 5분)
    data.push(faker.number.int({ min: 10, max: 300 }));
  }
  return data;
};
