document.addEventListener("DOMContentLoaded", function(){
    let isAdmCheck = document.getElementById("is_adm");

    isAdmCheck.addEventListener("click", function(e){
        let admCodeBox = document.querySelector(".is_adm_code_box");
        if(e.target.checked){
            admCodeBox.classList.add("active");
        }else{
            admCodeBox.classList.remove("active");
        }
    });
});
