<template>
  <div>
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
        <h2 class="h2 text-center">Почему мы? </h2>
        <div class="row elem-li">
            <div class="col-6-lg text-center">
                <span>Самый быстрый ресурс для передачи файлов!</span>
            </div>
            <div class="col-6-lg">
                <span>Самый быстрый ресурс для передачи файлов!</span>
            </div>
        </div>
    </div>
    <div class="mt-4 div-elem text-center">
        <transition name="slide-fade" class="w-100 d-flex justify-content-center">
            <button class="btn btn-success" @click="addFile = !addFile" v-if="!addFile">Добавить файл</button>
            <div v-if="addFile">
                <div class="c-both m-2">
                    <button class="btn btn-outline-primary" @click="addFile = !addFile">Назад</button>
                </div>
                <div class="c-both m-2 form-group text-center">
                    <label for="textMessage" class="float-left ml-4 font-weight-bold">Сообщение</label>
                    <input type="text" id="textMessage" class="form-control" placeholder="Текст" v-model="textMessage">
                </div>
                <div class="c-both m-2 border border-grey p-2 rounded-lg" v-if="textMessage">
                    <label for="exampleFormControlFile1" v-if="textMessage" class="font-weight-bold d-block">Выберите файл для передачи</label>
                    <input type="file" id="files" ref="files" v-if="textMessage" @change="handleFileUpload()">
                </div>
                <div class="c-both m-2">
                    <button class="btn btn-success" v-if="files" @click="addFile = !addFile">Отправить</button>
                </div>
            </div>
        </transition>
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
        files: '',
      };
    },
    methods: {
        handleFileUpload(){
            this.files = this.$refs.files.files[0];
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
.elem-li span:hover {
    font-size: 120%;
    cursor: default;
}
.c-both {
    clear: both;
}
</style>