#Usage

```
const phoneMaskInput = new PhoneMaskInput()

const MyForm = () => {
  return (
    <Form>
      <Form.Item>
        <Input
          style={{ width: 200 }}
          defaultValue={null}
          onKeyUp={phoneMaskInput.handleChange}
          onMouseUp={phoneMaskInput.handleMouseUp}
          value={phoneMaskInput.value}
        />
      </Form.Item>
    </Form>
  );
};
```