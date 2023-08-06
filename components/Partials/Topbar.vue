<template>
  <div class="flex items-center justify-between bg-white sticky top-0 h-16 px-8 z-50">
    <h4 class=" text-[1.125rem] text-grey-500">
      Dashboard Reviews
    </h4>

    <div  class="flex items-center space-x-8"> 
      <span class="relative flex items-center cursor-pointer space-x-4 text-gray-500">
        <IconNotification /> 
        <span class="absolute flex items-center justify-center text-center -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-error-500 text-[#FCFEFF] text-[8px] ">1</span>
      </span>

      <span class="flex items-center space-x-0.5"> 
        <nuxt-link class="h-auto w-auto border rounded-full !mr-0" to="/account">
          <img src="~/assets/images/profile-picture.svg" class="h-8 w-8" />
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