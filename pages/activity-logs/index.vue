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
          />
        </div>

        <div class="flex !h-[3.125rem] !w-fit items-center space-x-4 rounded-lg border px-4">
          <IconFilter />
          <TypoNormalText size="sm">Filter</TypoNormalText>
        </div>
      </div>
    </section>

    <!-- deals -->
    <section class="grid">
      <div>
        <CardContainer size="auto" customClass="space-y-4">
          <table class="table-auto w-full">
            <thead class="bg-ui-bg">
              <tr>
                <td class="border-[1px] border-input-bg bg-transaprent">
                  <TypoNormalText
                    size="sm"
                    customClass="!text-grey-700 capitalize !font-medium px-6 py-3"
                  >
                    Date
                  </TypoNormalText>
                </td>
                <td class="border-[1px] border-input-bg bg-transaprent">
                  <TypoNormalText
                    size="sm"
                    customClass="!text-grey-700 capitalize !font-medium px-6 py-3"
                  >
                    IP address
                  </TypoNormalText>
                </td>
                <td class="border-[1px] border-input-bg bg-transaprent">
                  <TypoNormalText
                    size="sm"
                    customClass="!text-grey-700 capitalize !font-medium px-6 py-3"
                  >
                    Type
                  </TypoNormalText>
                </td>
                <td class="border-[1px] border-input-bg bg-transaprent">
                  <TypoNormalText
                    size="sm"
                    customClass="!text-grey-700  capitalize !font-medium px-6 py-3"
                  >
                    Description
                  </TypoNormalText>
                </td>
                <td class="border-[1px] border-input-bg bg-transaprent">
                  <TypoNormalText
                    size="sm"
                    customClass="!text-grey-700 capitalize !font-medium px-6 py-3"
                  >
                    Status
                  </TypoNormalText>
                </td>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr
                v-for="log in activityLogs"
                :key="log.id"
                class="hover:bg-ui-bg hover:bg-opacity-30 cursor-pointer"
              >
                <td class="border-[1px] border-input-bg">
                  <TypoNormalText
                    size="sm"
                    customClass="!text-grey-500 capitalize !font-normal px-6 py-4"
                  >
                    {{ log.date }}
                  </TypoNormalText>
                </td>
                <td class="border-[1px] border-input-bg">
                  <TypoNormalText
                    size="sm"
                    customClass="!text-grey-500 capitalize !font-normal px-6 py-4"
                  >
                    {{ log.ip }}
                  </TypoNormalText>
                </td>
                <td class="border-[1px] border-input-bg">
                  <TypoNormalText
                    size="sm"
                    customClass="!text-grey-500 capitalize !font-normal px-6 py-4"
                  >
                    {{ log.type }}
                  </TypoNormalText>
                </td>
                <td class="border-[1px] border-input-bg">
                  <TypoNormalText
                    size="sm"
                    customClass="!text-grey-500 capitalize !font-normal px-6 py-4"
                  >
                    {{ log.description }}
                  </TypoNormalText>
                </td>
                <td class="border-[1px] border-input-bg">
                  <TypoNormalText
                    size="sm"
                    :customClass="`
                      !font-normal px-6 py-4 capitalize
                      ${log.status == 'completed' && '!text-success-500'} 
                      ${log.status == 'updated' && '!text-secondary-500'} 
                      ${log.status == 'failed' && '!text-error-500 italic'}
                    `"
                  >
                    {{ log.status }}
                  </TypoNormalText>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContainer>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  const searchText = ref('');

  const activityLogs = ref([
    {
      id: '12131',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'completed',
    },
    {
      id: '2',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'updated',
    },
    {
      id: '132',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'updated',
    },
    {
      id: '121',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'completed',
    },
    {
      id: '142',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'failed',
    },
    {
      id: '11',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'failed',
    },
    {
      id: '1',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'updated',
    },
    {
      id: '21',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'updated',
    },
    {
      id: '751',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'completed',
    },
    {
      id: '197',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'failed',
    },
    {
      id: '1531',
      date: '2023-03-01 06:59:02',
      ip: '127.0.0.1',
      type: 'Buy order',
      description: 'The activitiy description goes here',
      status: 'completed',
    },
  ]);
</script>
