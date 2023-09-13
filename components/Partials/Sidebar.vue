<template>
  <div class="overflow-y-auto no-scrollbar overflow-x-hidden py-6 flex flex-col flex-grow">
    <div class="py-2">
      <div class="mb-8 px-4">
        <Brandname type="white" />
      </div>

      <div class="flex items-center space-x-2 py-1 px-4">
        <span
          class="h-11 w-11 text-xs font-semibold bg-white text-secondary-500 border border-secondary-500 rounded-full flex justify-center items-center"
        >
          MH
        </span>

        <div class="flex-1">
          <h5 class="text-secondary-50 text-base font-medium mb-0">Bank of Vessel</h5>
          <span class="block text-secondary-500 text-[13px]">Financier</span>
        </div>
      </div>
    </div>

    <!-- Main menu -->
    <div class="border-b border-secondary-800 py-6">
      <h6 class="text-sm font-light tracking-wide text-grey-200 px-4 mb-2 py-2">Main menu</h6>

      <div class="flex flex-col space-y-3">
        <nuxt-link v-for="link in mainMenu" :key="link.route" :to="link.route">
          <div
            class="flex items-center space-x-2 rounded-md font-Poppins text-grey-200 py-2.5 px-4"
            :class="tabIsActive(link.route) && 'bg-secondary-50 text-secondary-500 '"
          >
            <IconSidebar :title="link.icon" />
            <span>{{ link.title }}</span>
          </div>
        </nuxt-link>
      </div>
    </div>

    <!-- Preferences -->
    <div class="py-6">
      <h6 class="text-sm font-light tracking-wide text-grey-200 px-4 mb-2 py-2">Preferences</h6>

      <div class="flex flex-col space-y-3">
        <nuxt-link v-for="preference in preferences" :key="preference.route" :to="preference.route">
          <div
            class="flex items-center space-x-2 rounded-md font-Poppins text-grey-200 py-2.5 px-4"
            :class="tabIsActive(preference.route) && 'bg-secondary-50 text-secondary-500 '"
          >
            <IconSidebar :title="preference.icon" />
            <span>{{ preference.title }}</span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const mainMenu = ref([
    {
      title: 'Dashboards',
      route: '/dashboards',
      icon: 'dashboards',
    },
    {
      title: 'My Deals',
      route: '/my-deals',
      icon: 'my-deals',
    },
    // {
    //   title: "Marketplace",
    //   route: "/marketplace",
    //   icon: "marketplace"
    // },
    {
      title: 'Messages',
      route: '/messages',
      icon: 'messages',
    },
    {
      title: 'Activity logs',
      route: '/activity-logs',
      icon: 'activity-logs',
    },
  ]);

  const preferences = ref([
    {
      title: 'Account',
      route: '/account',
      icon: 'profile',
    },
  ]);

  const activeTab = ref('/dashboards');

  const tabIsActive = (tabRoute: string) => {
    const mainName = tabRoute;
    const route = useRoute();

    if (mainName == 'base' && route.path == '/') {
      return true;
    } else if (mainName != 'base' && route.path.includes(mainName)) {
      return true;
    }

    return false;
  };
</script>
