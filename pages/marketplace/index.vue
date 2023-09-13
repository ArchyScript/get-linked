<template>
  <div class="space-y-8">
    <!-- header -->
    <section class="flex justify-between items-center">
      <div class="flex items-center space-x-6">
        <div class="relative rounded border">
          <!-- Icons  -->
          <div class="absolute bottom-[0.875rem] left-[0.875rem]">
            <IconSearch />
          </div>
          <input
            id="search-box"
            v-model="searchText"
            type="text"
            name="search-box"
            class="h-[3.125rem] !w-full rounded border-none bg-[#FCFCFE] px-12 text-base outline-none placeholder:text-[#656e83]"
            placeholder="Search campaigns..."
            @input="filterCampaigns"
          />
        </div>

        <div class="flex !h-[3.125rem] !w-fit items-center space-x-4 rounded-lg border px-4">
          <IconFilter />
          <TypoNormalText size="sm">Filter</TypoNormalText>
        </div>
      </div>
    </section>

    <!-- marketplaces -->
    <section class="grid w-full grid-cols-2 gap-8">
      <CardMarketplace
        v-for="marketplace in marketplaces"
        :key="marketplace.id"
        :marketplace="marketplace"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
  const searchText = ref('');

  const marketplaces = ref([
    {
      id: '1',
      imageUrl: '~/public/images/img-1.png',
      title: 'BLCO',
      seller: 'Daniel Script',
      requestAmount: 1000074300,
      interestRate: 30,
      deliveryDays: '21 Days',
    },
    {
      id: '2',
      imageUrl: '~/public/images/img-1.png',
      title: 'BLCO',
      seller: 'Daniel Script',
      requestAmount: 908,
      interestRate: 30,
      deliveryDays: '21 Days',
    },
    {
      id: '3',
      imageUrl: '~/public/images/img-1.png',
      title: 'BLCO',
      seller: 'Daniel Script',
      requestAmount: 1000074300,
      interestRate: 30,
      deliveryDays: '21 Days',
    },
    {
      id: '4',
      imageUrl: '~/public/images/img-1.png',
      title: 'BLCO',
      seller: 'Daniel Script',
      requestAmount: 1000074300,
      interestRate: 30,
      deliveryDays: '21 Days',
    },
    {
      id: '5',
      imageUrl: '~/public/images/img-1.png',
      title: 'BLCO',
      seller: 'Daniel Script',
      requestAmount: 34452,
      interestRate: 30,
      deliveryDays: '21 Days',
    },
    {
      id: '15',
      imageUrl: '~/public/images/img-1.png',
      title: 'BLCO',
      seller: 'Daniel Script',
      requestAmount: 1000074300,
      interestRate: 30,
      deliveryDays: '21 Days',
    },
    {
      id: '12',
      imageUrl: '~/public/images/img-1.png',
      title: 'BLCO',
      seller: 'Daniel Script',
      requestAmount: 1000074300,
      interestRate: 30,
      deliveryDays: '21 Days',
    },
    {
      id: '11',
      imageUrl: '~/public/images/img-1.png',
      title: 'BLCO',
      seller: 'Daniel Script',
      requestAmount: 334342,
      interestRate: 30,
      deliveryDays: '45 Days',
    },
    {
      id: '18',
      imageUrl: '~/public/images/img-1.png',
      title: 'BLCO',
      seller: 'Daniel Script',
      requestAmount: 1000074300,
      interestRate: 30,
      deliveryDays: '21 Days',
    },
    {
      id: '164',
      imageUrl: '~/public/images/img-1.png',
      title: 'BLCO',
      seller: 'Daniel Script',
      requestAmount: 1000074300,
      interestRate: 30,
      deliveryDays: '21 Days',
    },
    {
      id: '132',
      imageUrl: '~/public/images/img-1.png',
      title: 'BLCO',
      seller: 'Daniel Script',
      requestAmount: 1000074300,
      interestRate: 30,
      deliveryDays: '21 Days',
    },
  ]);

  const filterCampaigns = () => {
    console.log(searchText.value);
    // const result =  []
    //   marketplaces.value.forEach(campaign => {
    //       if  (campaign.title.toLowerCase().includes(this.searchText.toLowerCase())) {
    //           result.push(campaign)
    //       }
    //   });
    // filterdCampaigns.value = result
  };
</script>
