<template>
  <div class="grid grid-cols-3 gap-x-8">
    <section class="col-span-2 space-y-6 items-center">
      <CardContainer class="!p-5 rounded-md !pr-8 space-y-4 w-full">
        <div class="flex items-center !bg-primary-50 rounded-md">
          <TypoHeaderText
            v-for="(tab, index) in tabs"
            :key="`${tab.id}_${index}`"
            size="sm"
            :customClass="`
              flex-1 text-center !text-grey-700 capitalize select-none !font-medium px-6 py-3 rounded-md cursor-pointer
              ${
                activeTabId == tab.id
                  ? '!bg-primary-500 !text-white'
                  : '!text-primary-500 !bg-primary-50'
              }
            `"
            @click="toggleActiveTab(tab.id)"
          >
            {{ tab.title }}
          </TypoHeaderText>
        </div>

        <!-- Reset password -->
        <form
          class="space-y-4"
          @submit.prevent="changeFinancierPassword"
          v-if="activeTabId == 'reset-password'"
        >
          <TypoHeaderText size="sm" customClass="!text-grey-300 py-3 border-b-[1.5px] border-ui-bg">
            Choose a new password, something easy to remember.
          </TypoHeaderText>

          <div class="flex-col space-y-2">
            <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1">
              Old Password
            </TypoNormalText>

            <div class="relative bg-input-bg rounded">
              <input
                id="password"
                v-model="changePasswordPayload.old_password"
                :type="showPassword ? 'text' : 'password'"
                class="input-field !pr-12 !pl-4"
                placeholder="password"
                autocomplete="current-password"
              />

              <span class="icon icon-right" @click="showPassword = !showPassword">
                <IconEyes :title="showPassword ? 'open' : 'close'" />
              </span>
            </div>
          </div>

          <div class="flex-col space-y-2">
            <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1">
              New Password
            </TypoNormalText>

            <div class="relative bg-input-bg rounded">
              <input
                id="new_password"
                v-paste-restrict
                v-model="changePasswordPayload.new_password"
                :type="showPassword ? 'text' : 'password'"
                class="input-field !pr-12 !pl-4"
                placeholder="password"
                autocomplete="current-password"
              />

              <span class="icon icon-right" @click="showPassword = !showPassword">
                <IconEyes :title="showPassword ? 'open' : 'close'" />
              </span>
            </div>
          </div>

          <div class="flex-col space-y-2">
            <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1">
              Confirm Password
            </TypoNormalText>

            <div class="relative bg-input-bg rounded">
              <input
                id="confirm_password"
                v-paste-restrict
                v-model="changePasswordPayload.confirm_password"
                :type="showPassword ? 'text' : 'password'"
                class="input-field !pr-12 !pl-4"
                placeholder="password"
                autocomplete="current-password"
              />

              <span class="icon icon-right" @click="showPassword = !showPassword">
                <IconEyes :title="showPassword ? 'open' : 'close'" />
              </span>
            </div>
          </div>

          <div class="flex w-full justify-end pt-6">
            <div class="flex items-center space-x-1">
              <Button
                text="Cancel"
                customClass="!text-primary-500 !py-4 !px-11 !bg-white !leading-[160%]"
              />
              <Button
                text="Save"
                type="submit"
                :loading="loading"
                customClass="!py-4 !px-11 !bg-primary-500   !leading-[160%]"
              />
            </div>
          </div>
        </form>

        <!-- 2-Factor Authentication -->
        <div class="space-y-4" v-else>
          <TypoHeaderText size="sm" customClass="!text-grey-300 py-3 border-b-[1.5px] border-ui-bg">
            Setup Two factor verification to increase security
          </TypoHeaderText>

          <div class="space-y-4">
            <div
              v-for="twoFA in twoFAs"
              :key="twoFA.title"
              class="space-y-2 ring-[1.5px] rounded-lg ring-primary-500 py-6 !px-5"
            >
              <TypoHeaderText size="lg" customClass="!text-grey-500 !font-semibold">
                {{ twoFA.title }}
              </TypoHeaderText>

              <div class="flex items-center space-x-5">
                <TypoNormalText size="base" customClass="flex-1 !text-grey-400 leading-[160%]">
                  {{ twoFA.description }}
                </TypoNormalText>

                <span class="pr-5 -pt-2">
                  <Toggle :value="toggleValue" @toggle="toggleValue = !toggleValue" />
                </span>
              </div>

              <div class="pt-2" v-if="toggleValue">
                <div
                  class="flex bg-primary-50 items-center justify-between px-3.5 py-3 rounded-md space-x-3"
                >
                  <div class="flex items-center space-x-1.5 !text-success-400">
                    <IconCheckbox type="square" />

                    <TypoNormalText
                      size="xs"
                      customClass="!text-grey-400 !font-normal !leading-[160%]"
                    >
                      Added June 24, 2021
                    </TypoNormalText>
                  </div>

                  <div class="flex items-center space-x-1.5">
                    <TypoNormalText
                      size="xs"
                      customClass="!text-grey-400 !font-semibold !leading-[160%]"
                    >
                      Binded phone number:
                    </TypoNormalText>

                    <TypoNormalText
                      size="xs"
                      customClass="!text-grey-400 !font-medium !leading-[160%]"
                    >
                      +562023237239
                    </TypoNormalText>
                  </div>

                  <TypoNormalText
                    size="xs"
                    @click="toggleValue = !toggleValue"
                    customClass="!text-primary-500 cursor-pointer !font-medium !leading-[160%]"
                  >
                    change
                  </TypoNormalText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { pasteHandler, dropHandler } from '~/utils';

  const { $toast } = useNuxtApp();
  const { changePassowrd } = useAuthApi();
  const router = useRouter();

  const loading = ref(false);
  const toggleValue = ref(false);
  const showPassword: Ref<boolean> = ref(false);
  const changePasswordPayload = ref({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const activeTabId = ref('reset-password');

  const tabs = ref([
    { title: 'Reset password', id: 'reset-password' },
    { title: '2-Factor Authentication', id: '2fa' },
  ]);

  const twoFAs = ref([
    {
      id: 'google-auth',
      title: 'Google Authenticator',
      description: 'Use the Google Authenticator app to generate one time security codes',
    },
    {
      id: 'email',
      title: 'Email',
      description: 'Use the Google Authenticator app to generate one time security codes',
    },
    {
      id: 'text-message',
      title: 'Text message (SMS) ',
      description: 'Use the Google Authenticator app to generate one time security codes',
    },
    {
      id: 'security-key',
      title: 'Security key',
      description: 'Use the Google Authenticator app to generate one time security codes',
    },
  ]);

  //
  const toggleActiveTab = (tabId: string) => {
    activeTabId.value = tabId;
  };
  const changeFinancierPassword = async () => {
    loading.value = true;
    const payload = {
      old_password: changePasswordPayload.value.old_password,
      password: changePasswordPayload.value.new_password,
    };
    const response = await changePassowrd(payload);
    const { data, error } = response;

    loading.value = false;
    if (error) return $toast('show', { type: 'error', message: error.message });
    console.log('data:', data);
  };

  // onMounted(() => {
  //   const confirmPasswordfield = document.getElementById('confirm_password');
  //   const newPasswordfield = document.getElementById('new_password');
  //   if (confirmPasswordfield) {
  //     confirmPasswordfield.addEventListener('paste', pasteHandler);
  //     confirmPasswordfield.addEventListener('drop', dropHandler);
  //   }
  //   if (newPasswordfield) {
  //     newPasswordfield.addEventListener('paste', pasteHandler);
  //     newPasswordfield.addEventListener('drop', dropHandler);
  //   }
  // });
</script>
