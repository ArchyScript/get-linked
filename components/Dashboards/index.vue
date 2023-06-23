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
    <section class="grid w-full  grid-cols-5 gap-4 ">  
      <!-- chart -->
      <div class="col-span-3"> 
          <CardContainer class="space-y-8 px-8 py-6 flex-col">
            <div class="flex justify-between items-center">
              <TypoHeaderText> Revenue </TypoHeaderText>

              <TypoNormalText customClass="cursor-pointer border px-4 py-1.5 rounded"> 2021 </TypoNormalText> 
            </div>

            <!-- chart --> 
            <div class="flex items-center justify-center">
              <GenericNoData/>
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

              <!-- list -->
              <div>
                <div v-if="recentTrades.length" class="flex-col max-h-[25rem] overflow-scroll no-scrollbar">
                  <div class="py-1 border-b-[0.2px] border-grey-50"  v-for="trade in recentTrades" :key="trade.id"> 
                    <div class=" flex space-x-4 justify-between items-center p-2  hover:bg-input-bg cursor-pointer" > 
                      <div class="flex-1 flex  items-center  space-x-2">
                        <div class="border h-12 w-12 rounded">
                          <img src="~/public/images/img-1.png" class="w-full h-full" :alt="trade.title" />
                          <ImageLoader photoUrl="/public/images/img-1.png" />
                        </div>

                        <div class="flex-1 truncate space-y-1.5">
                          <TypoHeaderText size="base" customClass="!text-grey-500 truncate "> {{trade.title}} </TypoHeaderText>
                          <TypoNormalText size="xs" customClass="!text-success-500 bg-success-50 px-1.5 flex rounded-xl !w-fit py-0.5"> {{trade.isVerified ? 'verified' : 'verified'}} </TypoNormalText> 
                        </div>
                      </div>
  
                      <div class="flex space-x-4">
                        <div class="flex-1 align-right flex-col flex truncate space-y-1.5">
                          <TypoHeaderText size="base" customClass="!text-grey-500 truncate "> {{`$${trade.amount}`}} </TypoHeaderText>
                          
                          <p class="flex-1 flex justify-end">
                          <TypoNormalText
                           size="xs"
                            customClass="!w-fit px-1.5 flex rounded-xl  py-0.5"
                            :class="`
                              ${trade.status == 'funded' && '!text-success-500'}
                              ${trade.status == 'inspecting' && '!text-warning-500'}
                              ${trade.status == 'cancelled' && '!text-error-500'}
                              ${trade.status == 'new request' && '!text-secondary-500'} 
                            `"
                          > 
                            {{trade.status}}
                          </TypoNormalText> 
                          </p>
                        </div>

                        <span v-if="trade.status == 'new request'" class="flex items-center justify-center">
                          <IconEmail/>
                        </span>
                      </div>
                    </div>
                  </div>
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
</script>
