interface Props {
  type?: 'primary' | 'danger' | 'success' | 'warning'
  defaultValue?: number
  value?: number
  min?: number
  max?: number
  disabled?: boolean
  tipFormatter?: (value: number) => JSX.Element
  marks?: {
    [prop: number]: any
  }
  step?: number
  vertical?: boolean
  onChange?: (value: number) => void
}
declare const Slider: React.ComponentType<Props>
export default Slider
