import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import { useEffect, useRef } from "react";
import FrequencyChart from "@/components/FrequencyChart";

const Card = styled.div`
  width: 616px;
  height: 370px;
  background: #fff;
  border-radius: 16px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  z-index: 1000;
  color: #1b1c1c;
  font-family: "Plus Jakarta Sans";
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 16px;
  margin-left: 5%;
  flex-shrink: 0;
`;

const ChartArea = styled.div`
  flex: 1;
  min-height: 0;
`;

function ChartSection({ frequency }) {
  return (
    <Card>
      <Title>유행어 사용 빈도</Title>
      <ChartArea>
        <FrequencyChart frequency={frequency} />
      </ChartArea>
    </Card>
  );
}

export default ChartSection;
