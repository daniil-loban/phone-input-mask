import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Input, Form } from "antd";

class PhoneMaskInput {
  constructor() {
    this.orderParts= ["countryCode", "operatorCode", "phone"];
    this.partMaxSize=  [3, 3, 7];
    this.selRange=  [[1,4], [5,8], [9,18]];
    [this.cursorStart, this.cursorEnd] = this.selRange[0]
    this.countryCode = "";
    this.operatorCode = "";
    this.phone = "";
  }

  static padCode = code => `___${code}`.slice(-3);
  static padPhone = num => `${num}_______`.slice(0, 7);
  static shrinkNum = num => num.slice(0, -1);
  static shiftLeftNum = num => num.slice(1);
  static isDigit = key => key.match(/\d/) !== null;
  static part = pos => {
    if (pos < 5) return "countryCode";
    if (pos < 9) return "operatorCode";
    return "phone";
  };
  
  firstEmpty(){
    for (let i = 0; i < this.orderParts.length; i++) {
      if (!this[this.orderParts[i]]) return i;
    }
    return this.orderParts.length - 1;
  }
  
  handleMouseUp = (e) => {
    this.cursorStart = e.target.selectionStart;
  }

  handleChange = (e) => {
    let partIndex = this.orderParts.indexOf(PhoneMaskInput.part(this.cursorStart));
    let currIndex = Math.min(partIndex, this.firstEmpty());
  
    if (e.key === "ArrowRight" || e.key === " " || e.key === "-") {
      if (currIndex < 2) currIndex += 1;
    }
  
    if (e.key === "ArrowLeft") {
      if (currIndex > 0) currIndex -= 1;
    }
  
    if ( PhoneMaskInput.isDigit(e.key) &&
      this[this.orderParts[currIndex]].length === this.partMaxSize[currIndex] ) {
      if (currIndex < 2) currIndex += 1;
    }
  
    if (PhoneMaskInput.isDigit(e.key)) {
      this[this.orderParts[currIndex]] += e.key;
      this[this.orderParts[currIndex]] = this[
        this.orderParts[currIndex]
      ].slice(-this.partMaxSize[currIndex]);
    }
  
    if (e.key === "Backspace") {
      if (this[this.orderParts[currIndex]] === "" && currIndex > 0) {
        currIndex -= 1;
      }
      this[this.orderParts[currIndex]] = PhoneMaskInput.shrinkNum(
        this[this.orderParts[currIndex]]
      );
    }
  
    if (e.key === "Delete") {
      this[this.orderParts[currIndex]] = PhoneMaskInput.shiftLeftNum(
        this[this.orderParts[currIndex]]
      );
    }

    e.target.value = this.value;
    [this.cursorStart, this.cursorEnd ]= this.selRange[currIndex]
    e.target.setSelectionRange(this.cursorStart, this.cursorEnd);
  }

  get value(){
    let padPnoneNum = PhoneMaskInput.padPhone(this.phone);
    let num = `+${PhoneMaskInput.padCode(this.countryCode)}(${PhoneMaskInput.padCode(
      this.operatorCode
    )})${padPnoneNum.slice(0, 3)}-${padPnoneNum.slice(3, 5)}-${padPnoneNum.slice(
      5,
      8
    )}`;
    return num  
  }
}

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

ReactDOM.render(<MyForm />, document.getElementById("container"));