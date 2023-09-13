<template>
  <div class="space-y-4">
    <!-- header -->
    <section class="flex items-center w-fit border-b-4 border-grey-50 space-x-4">
      <TypoHeaderText
        v-for="(tab, index) in tabs"
        :key="`${tab.id}_${index}`"
        size="sm"
        :customClass="`
          !text-grey-700 capitalize select-none !font-medium px-6 py-3 cursor-pointer
          ${
            activeTabId == tab.id
              ? 'border-b-4 -mb-1 border-primary-500 !text-primary-500'
              : '!text-grey-300'
          }
        `"
        @click="toggleActiveTab(tab.id)"
      >
        {{ tab.title }}
      </TypoHeaderText>
    </section>

    <!-- card -->
    <section>
      <div v-if="activeTabId == 'profile'"><AccountProfile /></div>
      <div v-if="activeTabId == 'security'"><AccountSecurity /></div>
      <div v-if="activeTabId == 'bank_information'"><AccountBankInformation /></div>
    </section>
  </div>
</template>

<script setup lang="ts">
  const activeTabId = ref('profile');

  const tabs = ref([
    { title: 'Profile', id: 'profile' },
    { title: 'Security', id: 'security' },
    // {title: "KYC Verification",  id: "kyc"},
    { title: 'Bank Information', id: 'bank_information' },
  ]);

  const toggleActiveTab = (tabId: string) => {
    activeTabId.value = tabId;
  };
</script>
