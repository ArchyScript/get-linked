<template> 
  <section class="grid grid-cols-3 sticky max-h-[70vh] pb-8">
    <CardContainer  size="md" customClass="!relative h-full space-y-6 !p-6 col-span-1 box-shadow">
      <div class="h-12">
        test
      </div>

      <section class="sticky top-0 flex w-full items-center w-full border-b-[3px] border-grey-50">
        <TypoHeaderText  
          v-for="(tab, index) in tabs" :key="`${tab.id}_${index}`"
          size="sm"
          :customClass="`
            capitalize select-none flex-1 !font-medium text-center py-3 cursor-pointer
            ${ activeTabId == tab.id ? 'border-b-[3px] -mb-0.5 border-primary-500 !text-primary-500' : '!text-grey-200' }
          `"
          @click="toggleActiveTab(tab.id)"
        >
          {{tab.title}}
        </TypoHeaderText> 
      </section>

      <div class="top-12 space-y-2 overflow-scroll no-scrollbar !h-[calc(70vh-2rem)]">
        <div v-if="messages.length">
          <CardMessage  v-for="(message) in messages" :key="message.id" :message="message" />
        </div>

        <div v-else class="flex items-center justify-center h-full justify-center items-center">
          <GenericNoData 
            type="message"
            :iconHeight="70"
            :iconWidth="100" 
            title="No conversations yet, when you begin texting, your conversations will show up here."
            customClass="!font-normal"
          />
        </div>
      </div>
    </CardContainer>
     
    <div  class="h-full col-span-2 ">
      <div class="!h-full">
        <CardContainer class="relative !w-full h-full p-0" v-if="isReadyToChat">
          <div class=" absolute top-0 left-0 w-full border px-6 py-3">
            <div class="flex justify-between  items-center">
              gsnmnf
            </div>
          </div>

          <div class="!bg-ui-bg flex-1 h-full py-12 px-6 border">
            ererer
          </div>
          
          <div class=" absolute bottom-0 left-0 px-6 py-3">
            ererer
          </div>
        </CardContainer>

        <div v-else class="flex items-center justify-center h-full justify-center items-center">
          <GenericNoData
            type="logo"
            :iconHeight="84"
            :iconWidth="140" 
            title="Send and receive messages from clients. Use our VesselTrust to fund create contact and close deals"
            customClass="!font-light !w-1/2 py-2"
          />
        </div>
      </div>
    </div>
  </section>  
</template>

<script setup lang="ts">
const toggleValue =  ref(false)
const isReadyToChat: Ref<boolean> = ref(true); 
const activeTabId = ref("all")

const tabs = ref([
  {title: "All conversations", id: "all"},
  {title: "unread",  id: "unread"}, 
])

const messages = ref([
  {
    id: '122323232',
    photo_url: '~/public/images/img-1.png',
    username: 'archyscript',
    unreadMessages: 2,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
  {
    id: '122323232',
    photo_url: '~/public/images/img-1.png',
    username: 'archys cript',
    unreadMessages: 0,
    date:  `45/23/5053`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
  {
    id: '122323232',
    photo_url: '~/public/images/img-1.png',
    username: 'Oluwatoyin Script',
    unreadMessages: 2,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
  {
    id: '122323232',
    photo_url: '~/public/images/img-1.png',
    username: 'archyscript',
    unreadMessages: 0,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
  {
    id: '122323232',
    photo_url: '~/public/images/img-1.png',
    username: 'archyscript',
    unreadMessages: 2,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },   
  {
    id: '122323232',
    photo_url: '~/public/images/img-1.png',
    username: 'archyscript',
    unreadMessages: 2,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },
  {
    id: '122323232',
    photo_url: '~/public/images/img-1.png',
    username: 'archys cript',
    unreadMessages: 0,
    date:  `45/23/5053`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
  {
    id: '122323232',
    photo_url: '~/public/images/img-1.png',
    username: 'Oluwatoyin Script',
    unreadMessages: 0,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
  {
    id: '122323232',
    photo_url: '~/public/images/img-1.png',
    username: 'archyscript',
    unreadMessages: 2,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },     
  {
    id: '122323232',
    photo_url: '~/public/images/img-1.png',
    username: 'archyscript',
    unreadMessages: 0,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
])
 

// 
const toggleActiveTab = (tabId: string) => {
  activeTabId.value = tabId 
}
</script>
 