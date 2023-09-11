<template>
  <div class="flex items-center justify-between bg-white sticky top-0 h-16 px-8 z-50">
    <TypoHeaderText size="lg" cuctomClass="!text-grey-500"> 
      {{ topbarTitle }}   
    </TypoHeaderText>

    <div  class="flex items-center space-x-8"> 
      <span class="relative flex items-center cursor-pointer space-x-4 text-gray-500">
        <IconNotification /> 
        <span class="absolute flex items-center justify-center text-center -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-error-500 text-[#FCFEFF] text-[8px] ">1</span>
      </span>

      <span class="flex items-center space-x-0.5"> 
        <nuxt-link class="h-auto w-auto border rounded-full !mr-0" to="/account">
          <span class="inline-block !h-12 !w-12">
            <Avatar 
              name="default-user-image"  
              customClass="!w-full !h-full !rounded-full flex !justify-center !items-center"
              fileType="svg"
            />
          </span>
        </nuxt-link>

        <el-dropdown trigger="click">
          <span class="el-dropdown-link p-2">
            <IconArrow type="caret-down" :width="9" :height="6" />  
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <span class="flex items-center space-x-2  bg-red-500"> 
                  <span>test </span>
                  <span> Span </span>
                </span>

              </el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item> 
            </el-dropdown-menu>
          </template>
        </el-dropdown> 
      </span> 
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
 
const topbarTitle = computed(() => { 
  const routeFullPath =  route.fullPath  
  if (routeFullPath == '/') return "Loading..."
  
  const firstSegment =  routeFullPath?.split('/').filter(segment => segment)[0]

  if (firstSegment == "dashboards") return "Dashboard Reviews" 
  const words = firstSegment.split('-');

  // Capitalize the first letter of each word and join them with a space
  const result = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');

  // return firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1)
  return result
}) 
</script>