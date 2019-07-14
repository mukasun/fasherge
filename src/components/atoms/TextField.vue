<template lang="pug">
  BaseInput(:inputState="inputState" :message="errorMessage || hint")
    .f-input__slot(slot="label" v-if="hasLabel")
      label {{ label }}
    .f-input__slot(slot="field" :class="classes")
      input.f-input__text-field(
        v-model="text"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :min="min"
        :max="max"
        :minlength="minlength"
        :maxlength="maxlength"
        :pattern="pattern"
        @focus="onFocus"
        @blur="onBlur"
      )
      .f-input__suffix(v-if="hasSuffix") {{ suffix }}
    .f-input__slot(slot="details" v-if="hasDetail")
      .error(v-if="hasError") {{ errorMessage }}
      .hint(v-else) {{ hint }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BaseInput from '@/components/atoms/BaseInput.vue'

@Component({ components: { BaseInput } })
export default class TextField extends Vue {
  @Prop({ type: Boolean, default: false }) box!: boolean
  @Prop({ type: String }) hint!: string
  @Prop({ type: String }) label!: string
  @Prop({ type: Number }) min!: number
  @Prop({ type: Number }) minlength!: number
  @Prop({ type: Number }) max!: number
  @Prop({ type: Number }) maxlength!: number
  @Prop({ type: String }) pattern!: string
  @Prop({ type: String }) placeholder!: string
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Prop({ type: String }) suffix!: string
  @Prop({ type: String, default: 'text' }) type!: string
  @Prop({ type: String }) value!: string

  text: string = ''
  isActive: boolean = false
  errorMessage: string = ''

  get classes(): { [key: string]: boolean } {
    return { 'f-input__slot--box': this.box }
  }

  get hasLabel(): boolean {
    return !!this.label
  }

  get hasSuffix(): boolean {
    return !!this.suffix
  }

  get hasHint(): boolean {
    return !!this.hint
  }

  get hasError(): boolean {
    return !!this.errorMessage
  }

  get hasDetail(): boolean {
    return this.hasError || this.hasHint
  }

  get inputState(): string {
    if (this.isActive) return 'active'
    if (this.hasError) return 'error'
    return 'inactive'
  }

  private onFocus() {
    this.isActive = true
  }

  private onBlur() {
    this.isActive = false
    if (this.required && !this.text) {
      this.errorMessage = '必須項目です'
    } else {
      this.errorMessage = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.f-input__slot {
  display: flex;

  .f-input__text-field {
    background-color: transparent;
    flex: 1 1 auto;
    line-height: 20px;
    max-width: 100%;
    min-width: 0px;
    outline: none;
    padding: 8px 0 8px;
    width: 100%;
  }

  .f-input__suffix {
    padding: 8px 0 8px;
  }
}
</style>