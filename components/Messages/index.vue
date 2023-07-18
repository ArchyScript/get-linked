<template> 
  <div>
    
    <!-- Modals here -->
    <Modal
      id="project-details"
      v-if="showProjectDetailsModal"
      @close="showProjectDetailsModal = false"
    > 
      <ModalsProcessing/>

      <!-- <ModalsResponses
        message="Your identity verification failed vYour identity verification failedYour identity verification failedYour identity verification failed"
        type="error"
        :hasTitle="false"
        titleText="Test me"
        @close="showProjectDetailsModal = false"
      /> -->
    </Modal>

    
    <section class="grid grid-cols-3 sticky max-h-[70vh] pb-8"> 
      <CardContainer  size="md" customClass="!relative h-full space-y-6 !p-6 col-span-1 box-shadow">
        <div class="h-12">
          <div class="flex items-center space-x-4">
            <div class="relative rounded border"> 
              <div class="absolute bottom-[0.875rem] left-[0.875rem]">
                <IconSearch />
              </div>

              <input
                id="search-box"
                v-model="searchText"
                type="text"
                name="search-box"
                class="h-[3.125rem] !w-full rounded border-none bg-ui-bg px-12 text-base outline-none placeholder:text-[#656e83]"
                placeholder="Search campaigns..."
                @input="filterCampaigns"
              />
            </div>

            <div class="flex !h-[3.125rem] !w-fit items-center space-x-4 rounded-lg border px-4">
              <IconFilter /> 
            </div>
          </div>
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
          <div v-if="chats.length">
            <CardChat  v-for="(chat) in chats" :key="chat.id" :chat="chat" />
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
      
      <div  class="h-full col-span-2  !h-full "> 
        <CardContainer class="relative !w-full h-full p-0" v-if="isReadyToChat">
          <div class="z-10 absolute top-0 left-0 w-full bg-white px-6 py-3">
            <div class="flex-1 flex space-x-3 justify-between items-center">
              <div class="flex space-x-2 items-center "> 
                <span class="h-9 w-9 relative rounded-full ring-1 ring-secondary-500 ">
                  <img src="~/assets/images/profile-picture.svg" class="w-full h-full rounded-full" /> 
                  <span class="absolute bottom-0 right-0 rounded-full h-2 w-2 bg-success-500"></span>
                </span>

                <div class="flex-1 truncate space-y-0.5">
                  <TypoHeaderText size="base" customClass="!text-grey-500 truncate"> Oluwatoyin Script </TypoHeaderText> 

                  <TypoNormalText customClass="!text-grey-400 !text-[10px] flex rounded-xl !w-fit"> Active now </TypoNormalText>  
                </div>
              </div>

              <div class=" flex space-x-3.5 items-center text-grey-200"> 
                <IconVideo/>

                <Button text="View request"  @click="showProjectDetailsModal = true" :hasBorder="true" customClass="!py-2 !px-4 !bg-white !font-medium !leading-[160%]"/> 

                <span class="!bg-ui-bg h-8 w-1"> </span> 

                <IconEllipsis class="cursor-pointer"/>
              </div>
            </div>  
          </div>

          <!--  -->
          <div class="flex-1 h-full py-16 bg-white overflow-scroll no-scrollbar px-6">
            <div class=" h-[120%] space-y-4 !bg-ui-bg py-8">  
              <CardMessageInChat
                v-for="message in messages" :key="message.time"
                :message="message.message"
                :time="message.time" 
                :isSent="message.isSent" 
              />  
            </div>
          </div>
          
          <!--  -->
          <div class="absolute bottom-0 left-0  w-full bg-white px-6 py-3"> 
            <div class=" flex space-x-3.5 items-center text-grey-500"> 
              <IconAttatchment class="cursor-pointer"/>

              <span class="!bg-ui-bg h-8 w-1"> </span> 

              <IconEmoji type="smiley" class="cursor-pointer"/>

              <input
                class="w-full flex-1 bg-transparent rounded leading-5 block text-sm py-3.5 outline-0 border-0 bg-ui-bg !px-4"
                type="text"
                placeholder="Type a message" 
              />

              <IconSpeaker class="cursor-pointer"/>
            </div>  
          </div>
        </CardContainer>

        <div v-else class="flex items-center justify-center h-full justify-center items-center">
          <GenericNoData
            type="logo"
            :iconHeight="84"
            :iconWidth="140" 
            title="Send and receive chats from clients. Use our VesselTrust to fund create contact and close deals"
            customClass="!font-light !w-1/2 py-2"
          />
        </div> 
      </div>
    </section>  
  </div>
</template>

<script setup lang="ts">
const showProjectDetailsModal = ref(false);
const toggleValue =  ref(false)
const isReadyToChat: Ref<boolean> = ref(true); 
const activeTabId = ref("all")

const tabs = ref([
  {title: "All conversations", id: "all"},
  {title: "unread",  id: "unread"}, 
])

const chats = ref([
  {
    id: '122323232',
    // photo_url: '~/assets/images/profile-picture.svg',
    username: 'archyscript',
    unreadMessages: 2,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
  {
    id: '122323232',
    // photo_url: '~/assets/images/profile-picture.svg',
    username: 'archys cript',
    unreadMessages: 0,
    date:  `45/23/5053`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
  {
    id: '122323232',
    // photo_url: '~/assets/images/profile-picture.svg',
    username: 'Oluwatoyin Script',
    unreadMessages: 2,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
  {
    id: '122323232',
    // photo_url: '~/assets/images/profile-picture.svg',
    username: 'archyscript',
    unreadMessages: 0,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
  {
    id: '122323232',
    // photo_url: '~/assets/images/profile-picture.svg',
    username: 'archyscript',
    unreadMessages: 2,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },   
  {
    id: '122323232',
    // photo_url: '~/assets/images/profile-picture.svg',
    username: 'archyscript',
    unreadMessages: 2,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },
  {
    id: '122323232',
    // photo_url: '~/assets/images/profile-picture.svg',
    username: 'archys cript',
    unreadMessages: 0,
    date:  `45/23/5053`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
  {
    id: '122323232',
    // photo_url: '~/assets/images/profile-picture.svg',
    username: 'Oluwatoyin Script',
    unreadMessages: 0,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
  {
    id: '122323232',
    // photo_url: '~/assets/images/profile-picture.svg',
    username: 'archyscript',
    unreadMessages: 2,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },     
  {
    id: '122323232',
    // photo_url: '~/assets/images/profile-picture.svg',
    username: 'archyscript',
    unreadMessages: 0,
    date:  `today`,
    message: 'Use the Google Authenticator app to generate one time security codes',
  },  
])
 

 const messages =  ref([
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: false
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: true
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: false
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: true
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: true
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: false
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: true
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: false
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: true
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: true
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: false
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: true
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: false
  },
  {
    message: "Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla. Lorem ipsum dolor sit amet, diam sapien. Porttitor dis tortor cras magnis convallis, vulputate mauris nibh tristique donec. Eros nunc pede nulla.",
    time: "34/87/9703",
    isSent: true
  },
 ])

// 
const toggleActiveTab = (tabId: string) => {
  activeTabId.value = tabId 
}
</script>
 