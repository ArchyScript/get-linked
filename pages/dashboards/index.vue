<template>
  <div class="space-y-6">
    <!-- header -->
    <section class="flex justify-between items-center">
      <h4 class="flex-1 text-[1.125rem] font-semibold font-Poppins text-grey-500">
       Hi, <span  class="text-secondary-600 "> Bank of Vessel </span> 👋🏻
      </h4>

      <span>
        <Button text="Fund new offer" class="!font-medium !py-3.5 !px-6 !text-sm" />
      </span>
    </section>
 

    <!-- card -->
    <section class="grid w-full  grid-cols-4 gap-5 ">
        <div v-for="card in cards" :key="card.title">
          <CardLeaderboard :data="card" />
        </div>
    </section>  
     
    <!-- chart and trades section -->
    <section class="grid w-full  grid-cols-5 gap-x-4 ">  
      <!-- chart -->
      <div class="col-span-3"> 
        <CardContainer class="space-y-8 px-8 py-6 flex-col">
          <div class="flex justify-between items-center">
            <TypoHeaderText> Revenue </TypoHeaderText>

            <TypoNormalText customClass="cursor-pointer border px-4 py-1.5 rounded"> 2021 </TypoNormalText> 
          </div>

          <!-- chart --> 
          <div class="flex items-center justify-center flex-grow">
            <div v-if="hasChart" class="flex-grow">
              <ChartsLine  :chartData="temperatureChartData" :chartOptions="chartOptions"/>
              <!-- <ChartsLine  :data="temperatureData" :labels="timeLabels" /> -->
            </div>

            <GenericNoData v-else/> 
          </div>  

          <div class="flex justify-between items-center">
            <TypoNormalText customClass="cursor-pointer flex-1"> Here is the CSV file you can download </TypoNormalText>

            <span> 
              <Button text="Fund new offer" class="!font-normal !py-1.5 !px-4 !bg-secondary-300 !text-xs" />
            </span>
          </div>
        </CardContainer>
      </div>
 
      <!-- recent trades -->
      <div class="col-span-2">
        <CardContainer class="space-y-5 px-8 py-6 flex-col">
          <div class="flex justify-between items-center">
            <TypoHeaderText> Recent requests </TypoHeaderText>

            <TypoNormalText customClass="cursor-pointer text-secondary-500"> see all </TypoNormalText> 
          </div>

          <div class="space-y-4 pb-6">
            <div class="flex justify-between items-center">
              <TypoHeaderText size="sm" customClass="cursor-pointer !text-grey-200"> Name </TypoHeaderText>

              <TypoNormalText customClass="cursor-pointer !text-grey-200"> Price </TypoNormalText> 
            </div>

            <!-- trade list -->
            <div>
              <div v-if="recentTrades.length" class="flex-col max-h-[25rem] overflow-scroll no-scrollbar">
                <CardTrade  v-for="trade in recentTrades" :key="trade.id" :trade="trade" /> 
              </div>

              <div v-else class="flex items-center justify-center">
                <GenericNoData/>
              </div>
            </div>
          </div>
        </CardContainer>
      </div> 
    </section> 
  </div>
</template>

<script setup lang="ts">
const hasChart = ref (false)
const cards = ref([
  {
    title: "Total funded trades",
    amount: 900,
    percentageChange: 20,
    isIncrease: true,
    isMoney: true
  },
   {
    title: "ongoing trades",
    amount: 5000,
    percentageChange: 67,
    isIncrease: false, 
  },
  {
    title: "closed trades",
    amount: 679,
    percentageChange: 56,
    isIncrease: true, 
  },
  {
    title: "inspecting trades",
    amount: 6000,
    percentageChange: 0,
    isIncrease: true, 
  },
])

const recentTrades = ref([
  { 
    id: "1",
    imageUrl: "public/images/img-1.png",
    isVerified: true,
    title: "BLCO",
    amount: 1000074300,
    status: "cancelled"
  },
  {
    id: "2",
    imageUrl: "~/assets/images/profile-picture.svg",
    isVerified: true,
    title: "BLCO",
    amount: 1000074300,
    status: "funded"
  },
  {
    id: "3",
    imageUrl: "",
    isVerified: true,
    title: "BLCO",
    amount: 1000074300,
    status: "inspecting"
  },
  {
    id: "4",
    imageUrl: "",
    isVerified: true,
    title: "BLCO",
    amount: 1266,
    status: "funded"
  },
  {
    id: "5",
    imageUrl: "",
    isVerified: true,
    title: "BLCO",
    amount: 40988,
    status: "new request"
  },
  {
    id: "6",
    imageUrl: "",
    isVerified: true,
    title: "BLCO",
    amount: 1000074300,
    status: "cancelled"
  },
  {
    id: "7",
    imageUrl: "",
    isVerified: true,
    title: "BLCO",
    amount: 1000074300,
    status: "inspecting"
  },
  {
    id: "8",
    imageUrl: "",
    isVerified: true,
    title: "BLCO",
    amount: 1000074300,
    status: "cancelled"
  },
  {
    id: "9",
    imageUrl: "",
    isVerified: true,
    title: "BLCO",
    amount: 1000074300,
    status: "inspecting"
  },
  {
    id: "10",
    imageUrl: "",
    isVerified: true,
    title: "BLCO",
    amount: 1000074300,
    status: "new request"
  },
])
 
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill?: boolean;
  }[];
}

const temperatureData = ref<number[]>([25, 28, 30, 27, 26, 29]);
const timeLabels = ref<string[]>(['12:00', '12:30', '1:00', '1:30', '2:00', '2:30']);
const temperatureChartData = ref<ChartData>({
  labels: ['12:00', '12:30', '1:00', '1:30', '2:00', '2:30'],
  datasets: [
    {
      label: 'Temperature',
      data: [25, 28, 30, 27, 26, 29],
      borderColor: 'blue',
      fill: false,
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
