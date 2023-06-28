<template>
  <CardContainer size="sm" :isRouted="true" :routerLink="`/marketplace/${marketplace.id}`" customClass="space-y-4">
    <!-- <div class="" >  -->
      <div class=" flex space-x-4"> 
        <div class="flex-1  flex space-x-2 items-center "> 
          <span class=" h-12 w-12 rounded">
            <img src="~/public/images/img-1.png" class="w-full h-full" :alt="marketplace.title" /> 
          </span>

          <div class="flex-1 truncate space-y-1.5">
            <TypoHeaderText size="base" customClass="!text-grey-500 truncate "> {{marketplace.title}} </TypoHeaderText>

            <p class="flex items-center space-x-1.5">
              <TypoNormalText size="xs" customClass="!text-grey-500"> Seller: </TypoNormalText> 
              <TypoNormalText size="xs" customClass="!text-primary-500">  {{marketplace.title}} </TypoNormalText>  
            </p>
          </div>
        </div>

        <TypoNormalText size="xs" customClass="!text-secondary-500 bg-secondary-50 px-1.5 flex rounded-xl !w-fit h-fit py-0.5"> new request </TypoNormalText> 
      </div> 

      <!--  -->
      <div class="flex items-end space-x-4">
        <div class="flex-1 align-right flex-col flex truncate space-y-1">
          <TypoNormalText size="xs" customClass="!text-grey-400"> Request amount </TypoNormalText> 
          <TypoHeaderText size="xl" customClass="!text-grey-500">  ${{marketplace.requestAmount}} </TypoHeaderText>
          <TypoNormalText customClass="!text-grey-400"> Interest rate:  {{marketplace.interestRate}} </TypoNormalText> 
          <TypoNormalText customClass="!text-grey-400"> Delivery Days:  {{marketplace.deliveryDays}} </TypoNormalText> 
        </div>

        <span class="flex items-center justify-center">
          <Button text="View request" :hasBorder="true" textSize="sm" class="!py-3 !px-6" />
        </span>
      </div>
    <!-- </div> -->
  </CardContainer>
</template>

<script setup lang="ts">
const props = defineProps({ 
  marketplace: {
    type: Object,
    default: {
      id: "",
      imageUrl: "", 
      title: "",
      seller: "",
      requestAmount: 0,
      interestRate: 0,
      deliveryDays: "" 
    },  
  },  
});
</script>
