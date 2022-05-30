//import * as Api from '../api.js';

const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById("name");
    const files = document.getElementById("files");
    const formData = new FormData();
    formData.append("name", name.value);
    for(let i =0; i < files.files.length; i++) {
      formData.append("files", files.files[i]);
    }
    fetch(`http://localhost:3000/api/upload`, {
      method: 'POST',
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data" 이 부분은 html form>encType에 적용
      // }
    })
      .then((res) => console.log(res))
      .catch((err) => ("Error occured", err));

    console.log(formData)
}