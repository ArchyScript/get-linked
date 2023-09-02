<template>
  <div class="space-y-6"> 
    <!--  -->
   <GoBack/> 
     
    <!-- chart and trades section -->
    <section class="grid w-full  grid-cols-5 gap-4 ">  
      <!-- chart -->
      <div class="col-span-3"> 
          <CardContainer size="md"  class="space-y-4 ">
            <div class="flex  items-center  space-x-4 pb-4  w-full border-b">
              <div class="flex-1  flex space-x-4 items-center "> 
                <span class=" h-16 w-16 rounded"> 
                  <Avatar  
                    name="img-1" 
                    customClass="!w-full !h-full"
                    :alt="'test'"
                  />
                </span>

                <div class="flex-1 truncate space-y-1.5">
                  <TypoHeaderText size="2xl" customClass="!text-grey-500 truncate font"> archyscript </TypoHeaderText>

                  <p class="flex items-center space-x-1.5">
                    <TypoNormalText size="base" customClass="!text-grey-400"> Seller: </TypoNormalText> 
                    <TypoNormalText size="base" customClass="!text-primary-500">  archyscript </TypoNormalText>  
                  </p>
                </div>
              </div>

              <div class=" flex flex-col justify-between space-y-3">
                <TypoNormalText size="base" customClass="!text-grey-500"> Status </TypoNormalText> 
                <TypoNormalText size="base" customClass="!text-secondary-500 bg-secondary-50 px-1.5 flex rounded-xl !w-fit h-fit py-0.5"> not funded </TypoNormalText> 
              </div>
            </div> 
 
            <!--  -->
            <div class="flex  space-x-4 pb-4 w-full border-b">
              <div class="flex-1 flex flex-col flex truncate space-y-0.5">
                <TypoNormalText customClass="!text-grey-400  !leading-[160%]"> Request amount </TypoNormalText> 
                <TypoHeaderText customClass="!text-grey-500 leading-[140%] tracking-wide font-semibold !text-[1.75rem]"> $240,898.00 </TypoHeaderText>
                <TypoNormalText customClass="!text-grey-400 !leading-[160%]"> Interest rate:  30% </TypoNormalText> 
                <TypoNormalText customClass="!text-grey-400  !leading-[160%]"> Delivery Days:  40days </TypoNormalText> 
              </div>

              <div class=" flex flex-col items-end justify-between space-y-3">
                <Button text="Fund request" class="!font-medium !w-fit !py-3 !px-6 !text-sm" />
                
                <Button text="Request inspection" customClass="!text-warning-500 !ring-warning-500" :hasBorder="true"  textSize="sm" :hasIcon="true" iconName="scan" class="!py-3 !px-6" />
              </div>
            </div>  

            <!--  -->
            <div class=" space-y-4">
              <TypoHeaderText customClass="!text-grey-500 leading-[120%] tracking-wide font-medium !text-lg"> Offer details </TypoHeaderText>


              <CardContainer customClass="!bg-ui-bg grid grid-cols-2 gap-y-3 gap-x-2">
                <div class="space-y-0.5">
                  <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Product Name </TypoNormalText> 
                  <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal !leading-[160%]"> Ballzstein </TypoHeaderText> 
                </div>
                <div class="space-y-0.5">
                  <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Delivery Days </TypoNormalText> 
                  <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal !leading-[160%]"> 21 Days </TypoHeaderText> 
                </div>
                <!--  -->
                <div class="space-y-0.5">
                  <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Price </TypoNormalText> 
                  <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal !leading-[160%]"> $800,000 </TypoHeaderText> 
                </div>
                <div class="space-y-0.5">
                  <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Contract Length </TypoNormalText> 
                  <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal !leading-[160%]"> 3 years </TypoHeaderText> 
                </div>
                <!--  -->
                <div class="space-y-0.5">
                  <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Quantity </TypoNormalText> 
                  <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal !leading-[160%]"> 194 Barrels </TypoHeaderText> 
                </div>
                <div class="space-y-0.5">
                  <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Vessel Name </TypoNormalText> 
                  <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal !leading-[160%]"> Floating Dock </TypoHeaderText> 
                </div>
                <!--  -->
                <div class="space-y-0.5">
                  <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Mode of transportation </TypoNormalText> 
                  <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal !leading-[160%]"> Vessel </TypoHeaderText> 
                </div>
                <div class="space-y-0.5">
                  <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Vessel Quality </TypoNormalText> 
                  <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal !leading-[160%]"> Excellent </TypoHeaderText> 
                </div>
                <!--  -->
                <div class="space-y-0.5">
                  <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Port Loading </TypoNormalText> 
                  <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal !leading-[160%]"> Apapa </TypoHeaderText> 
                </div>
                <div class="space-y-0.5">
                  <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> IMO Number </TypoNormalText> 
                  <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal !leading-[160%]"> IMO 9086442 </TypoHeaderText> 
                </div>
                <!--  -->
                <div class="col-span-2">
                  <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Procedure </TypoNormalText> 
                  <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal !leading-[160%]"> 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae fuga vel hic perferendis doloribus, ratione eius, nesciunt provident, quia modi eligendi sed quaerat animi aperiam magnam dignissimos mollitia nihil officia nostrum labore error ea. Minus ad, voluptatum explicabo sapiente illum laborum magni voluptatem eveniet quasi saepe labore culpa asperiores odio!  
                  </TypoHeaderText> 
                </div>

                
                <!--  -->
                <div class="col-span-2 flex flex items-center justify-between  border border-dashed  rounded">
                  <div class="col-span-2 flex items-center space-x-2 p-2 cursor-pointer text-secondary-500 rounded ">
                    <IconEyes title="open"/> 
                    <TypoNormalText size="xs" customClass="!text-secondary-500 !font-normal !leading-[160%]"> Laycan Agreement </TypoNormalText> 
                  </div>
                  <!--  -->
                  <div class="col-span-2 flex items-center space-x-2 p-2 cursor-pointer text-secondary-500 rounded">
                    <IconEyes title="open"/> 
                    <TypoNormalText size="xs" customClass="!text-secondary-500 !font-normal !leading-[160%]"> Laycan Agreement </TypoNormalText> 
                  </div>
                  <!--  -->
                  <div class="col-span-2 flex items-center space-x-2 p-2 cursor-pointer text-secondary-500 rounded">
                    <IconEyes title="open"/> 
                    <TypoNormalText size="xs" customClass="!text-secondary-500 !font-normal !leading-[160%]"> Laycan Agreement </TypoNormalText> 
                  </div>
                </div>
              </CardContainer>
            </div>
          </CardContainer>
      </div>
  
  <!--  -->
      <div class="col-span-2 space-y-5">
        <CardContainer size="md" class="flex-col space-y-4">
          <TypoHeaderText size="lg" customClass="leading-[160%] "> Sellers details </TypoHeaderText>

          <div class="flex-1  flex space-x-2 items-center "> 
            <span class=" h-12 w-12 rounded-full ring-2 ring-primary-500 ">
              <img src="~/public/images/img-1.png" class="w-full h-full rounded-full" /> 
            </span>

            <div class="flex-1 truncate space-y-1.5">
              <p class="flex items-center space-x-2">
                <TypoHeaderText customClass="!text-grey-500 truncate pr-2"> Oluwatoyin Script </TypoHeaderText>
                <IconCheckbox type="square" :width="20" :height="20" class="text-success-500"/>
              </p>

              <TypoNormalText customClass="!text-error-500 bg-error-50 px-1.5 flex rounded-xl !w-fit h-fit py-0.5"> Seller </TypoNormalText>  
            </div>
          </div>

          <div class="flex items-center space-x-1.5">
            <TypoNormalText customClass="!text-grey-400"> Trades(s) </TypoNormalText> 
            <TypoNormalText customClass="!text-grey-600 !font-semibold "> 2345 </TypoNormalText> 
            <TypoNormalText customClass="!text-grey-200"> | </TypoNormalText>  
            <TypoNormalText customClass="!text-grey-500 !font-medium"> 99% </TypoNormalText> 
          </div>

          <div class=" flex justify-end">  
            <Button text="Contact seller" customClass="!w-fit" :hasBorder="true"  textSize="sm" :hasIcon="true" iconName="email" class="!py-3 !px-6" />
          </div> 
        </CardContainer>

        <!--  -->
        <CardContainer size="md" class="flex-col space-y-4">
          <TypoHeaderText size="lg" customClass="leading-[160%]"> Proof of funding </TypoHeaderText>
 
          <CardContainer size="xs" customClass="!bg-ui-bg space-y-2">
            <div class="space-y-0.5">
              <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Type </TypoNormalText> 
              <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal  !leading-[160%]"> Ballzstein </TypoHeaderText> 
            </div>

            <!--  -->
            <div class="space-y-0.5">
              <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Address </TypoNormalText> 
              <p class=" flex justify-between items-center truncate space-x-2">
                <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal truncate !leading-[160%]"> 0x32gBe4125456412545678fgtjgbmj78fgtjgbm6412545678fgtjgbmjj015575x </TypoHeaderText> 
                
                <span class="p-1.5 rounded !text-secondary-500 bg-secondary-50 cursor-pointer">
                  <IconCopy fill="white"/>
                </span>
              </p>
            </div> 

            <!--  -->
            <div class="space-y-0.5">
              <TypoNormalText customClass="!text-grey-200 !leading-[160%]"> Amount </TypoNormalText> 
              <TypoHeaderText size="lg" customClass="!text-grey-500 !font-normal !leading-[160%]"> 21 Days </TypoHeaderText> 
            </div>  
          </CardContainer>
 
          <TypoHeaderText customClass="!text-primary-500 py-3  flex justify-center px-6"> 
            <nuxt-link to="/dashboards" class="text-center w-full underline"> View on block explorer </nuxt-link>
          </TypoHeaderText>   
        </CardContainer>
      </div> 
    </section> 
  </div>
</template>

<script setup lang="ts"> 
const recentTrades = ref([
  { 
    id: "1",
    imageUrl: "~/public/images/img-1.png",
    isVerified: true,
    title: "BLCO",
    amount: 1000074300,
    status: "cancelled"
  },
  {
    id: "2",
    imageUrl: "~/public/images/img-1.png",
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
