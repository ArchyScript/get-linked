 <template>
  <div class="bg-white rounded box-shadow p-8">
    <div class="text-sm p-1">
      <h3
        class="text-center leading-7 mb-2 text-[1.75rem] font-semibold text-grey-600"
      >
        Reset Password
      </h3>
      <p class="text-center text-grey-400 leading-6">
        An email has been sent to Badmusfrank@sample.com, Click the link in the
        email to reset your password.
      </p>

      <form class="mt-8">
        <div class="flex justify-center items-center space-x-4 w-full mt-6">
          <!--  -->
          <Button
            text="Resend email"
            :loading="loading"
            @click="handleForgotPassword"
            :hasBorder="true"
          />

          <!--  -->
          <Button
            text="Done"
            :loading="loading"
            @click="handleForgotPassword"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "auth" });
const loading: Ref<boolean> = ref(false);

// 
const handleForgotPassword = async () => {
  loading.value = true

  setTimeout(() => {
    loading.value = false
  }, 1500);
};

</script>

