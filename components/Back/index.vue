<template>
  <div class="flex items-center space-x-2 w-fit" @click="goBAck"> 
    <IconArrow/> 

    <TypoNormalText>
        Go Back now
    </TypoNormalText>
  </div>
</template>


<script setup lang="ts"> 
const router = useRouter()


const goBack = () => {
    router.go(-1)
}
</script>