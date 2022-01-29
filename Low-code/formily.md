自定义组件行为

校验联动

```tsx
    <SchemaField>
      <SchemaField.String
        name="aa"
        title="AA"
        required
        x-reactions={(field) => {
          field.selfErrors =
            field.query('bb').value() >= field.value ? 'AA必须大于BB' : ''
        }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
      <SchemaField.String
        name="bb"
        title="BB"
        required
        x-reactions={(field) => {
          field.selfErrors =
            field.query('aa').value() <= field.value ? 'AA必须大于BB' : ''
        }}
        x-component="NumberPicker"
        x-decorator="FormItem"
      />
    </SchemaField>
```

表单联动

```tsx
const form = createForm({
  effects() {
    onFieldValueChange('select', (field) => {
      form.setFieldState('input', (state) => {
        //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
        state.display = field.value
      })
    })
  },
})
```