<template>
  <div>
    <div class="container">
        <button @click="instruction = !instruction" class="btn btn-info w-100 rounded-0">
            Руководство пользователя
        </button>
        <transition name="slide-fade" class="w-100">
            <p v-if="instruction" class="text-info m-2">
                Функции пользователя: загружать файл, настраивать доступ к файлу
                (доступен только пользователю, который добавил файл, или доступен
                всем), просматривать список доступных файлов, удалить файл,
                скрыть/отобразить файл, фильтровать файлы (по расширению, по дате
                добавления, по пользователю), скачать файл.
            </p>
        </transition> 
        <div class="border border-info p-2 text-center">
            <h2 class="h2 text-center pb-4">Почему мы?</h2>
            <div class="row elem-li m-4 pb-4">
                <div class="col-6" data-title="Удобнее только у it-гигантов">
                    <p>Удобство</p>
                    <img src="../assets/conv-ico.svg" alt="" class="w-25">
                </div>
                <div class="col-6" data-title="Данные шифруются">
                    <p>Конфиденциальность</p>
                    <img src="../assets/confid-ico.svg" alt="" class="w-25">
                </div>
            </div>
            <div class="row elem-li m-4">
                <div class="col-6" data-title="Полный контроль на своими файлами">
                    <p>Надёжность</p>
                    <img src="../assets/lock-ico.svg" alt="" class="w-25">
                </div>
                <div class="col-6" data-title="Функционал необходимый всем">
                    <p>Актуальность</p>
                    <img src="../assets/actual-ico.svg" alt="" class="w-25">
                </div>
            </div>
        </div>
        <div class="mt-4 div-elem text-center">
            <!-- <transition name="slide-fade" class="w-100 d-flex justify-content-center">
                <button class="btn btn-success" @click="checkAuth()" v-if="!addFile">Добавить файл</button>
                <div v-if="addFile">
                    <div class="c-both m-2">
                        <button class="btn btn-outline-primary" @click="addFile = !addFile">Назад</button>
                    </div>
                    <div class="c-both m-2 form-group text-center">
                        <label for="textMessage" class="float-left ml-4 font-weight-bold">Сообщение</label>
                        <input type="text" id="textMessage" class="form-control" placeholder="Текст к загружаемому файлу" v-model="textMessage">
                    </div>
                    <div class="c-both m-2 p-2 custom-file" v-if="textMessage">
                        <input type="file" id="file" ref="file" v-if="textMessage" @change="handleFileUpload()" class="custom-file-input">
                        <label for="file" v-if="textMessage" class="custom-file-label">Выберите файл для передачи</label>
                    </div>
                    <div class="c-both m-2">
                        <button class="btn btn-success" v-if="file" @click="submitFile()">Отправить</button>
                    </div>
                </div>
            </transition> -->
            <form action="../php/getFile.php" method="post" enctype="multipart/form-data">
                <p>Изображения:
                    <input type="file" name="file[]" />
                    <input type="submit" value="Отправить" />
                </p>
            </form>
        </div>
    </div>
  </div>
</template>

<script>

 export default {
    data() {
      return {
        addFile: false,
        instruction: false,
        passwordVisible: false,
        textMessage: '',
        private: false,
        file: '',
      };
    },
    methods: {
        checkAuth() {
            this.addFile = !this.addFile;
        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
        submitFile() {
            let formData = new FormData();
            formData.append('file', this.file);
            this.$axios.post(
                '../php/getFile.php',
                formData
            ).then(function(){
                alert("Файл сохранён!")
                this.addFile = !this.addFile;
            }).catch(function(){
                alert("Непредвиденная ошибка!")
            });
        }
    }
};
</script>

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.elem-li div:hover {
    font-weight: bold;
    cursor: default;
    border: 1px solid gray;
    box-shadow: 0 0 20px rgba(0,0,0,1);
    -webkit-box-shadow: 0 0 20px rgba(0,0,0,1);
    -moz-box-shadow: 0 0 20px rgba(0,0,0,1);
    border-radius: 8px;
    padding: 4px;
}
.elem-li div:hover::after {
    content: attr(data-title);
    position: absolute;
    left: 0;
    top: -32px;
    z-index: 1; 
    background: rgba(0,0,0,0.1);
    font-size: 14px; 
    font-weight: bold;
    padding: 5px 10px; 
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
}
.c-both {
    clear: both;
}
.row .col-6 {
    padding: 5px;
}
</style>