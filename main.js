var app = new Vue({
    el: '#myapp',
    data() {
        return {
            instruction: false,

            addFile: false,
            status: false,
            textMessage: '',
            file: '',
            filesList: [],
            
            formGroup: false,
            login: false,
            regist: false,
            userLogin: '',
            userPassword:'',
            userData: null,

            change: false,
            delete: false,
            terms: false,
            
            newText: '',
            newStatus: false,
        }
    },
    methods: {
        uno_addFile: function() {
            this.addFile = !this.addFile;
        },
        uno_auth: function() {
            this.formGroup = !this.formGroup;
        },
        auth: function() {
            const self = this;
            if(!this.regist) {
                axios.get('http://localhost:3000/users?login=' + this.userLogin +"&password=" + this.userPassword)
                .then(function(response) {
                    this.userData = response.data;								
                })
                .then(function() {
                    if (this.userData[0]) {
                        if (this.userData[0]['role'] === 3) {
                            self.login = !self.login;
                        } else {
                            alert("Access denied")
                        }
                    } else {
                        alert("Not found");
                    }
                })
                .catch(function(error) {
                    alert(error);
                });
            } else {
                this.createFolder();
            }
        },
        reverseLogin: function() {
            location.reload()
        },
        handleFileUpload: function() {
            this.file = this.$refs.file.files[0];
        },
        uploadFile: function(){
            let self = this;
            let login = this.userLogin;
            this.file = this.$refs.file.files[0];
            let status = this.status ? "private" : "public";
            
            let formData = new FormData();
            formData.append('file', this.file);

             axios.post('ajaxfile.php', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'login': login
                }
            })
            .then(function (response) {
                if(response.data === 0){
                    alert('File not uploaded.');
                    console.log(response.data);
                }else{
                    let file = {
                        'id_user': response.data[0]['id'],
                        'name_file': self.file.name,
                        'status_file': status,
                        'text': self.textMessage
                    }
                    self.post_new_file(file)
                    alert('File uploaded.');
                }
            })
            .catch(function (error) {
                alert(error);
            });
        },
        post_new_file: function(data) {
            axios.post('http://localhost:3000/files', data)
            .then(function(response){
                console.log(response.statusText)
            })
        },
        createFolder: function() {
            let self = this;
            if (self.userLogin !== '') {
                axios({
                    method: 'post',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    url: 'createF.php',
                    data: self.userLogin
                })
                .then(function(response) {
                    if(response.data === 1) {
                        let newUser = {
                            'login': self.userLogin,
                            'password': self.userPassword,
                            'role': 3
                        }

                        axios.post('http://localhost:3000/users', newUser)
                        .then(response => (self.login = response.data))
                        .then(function() {
                            alert("Пользователь создан");
                        });
                    } else {
                        alert("Пользователь уже существует");
                    }
                })
                .catch(function (error) {
                    alert(error);
                });
            } else {
                alert("Login field is empty")
            }
        },
        getListFileByUser: function() {
            let self = this;
            axios.get(`http://localhost:3000/users?login=${self.userLogin}&role=3`)
            .then(function(response) {
                self.getFilesById(response.data[0]['id']);
            })
        },
        getFilesById: function(idUser) {
            let self = this;
            axios.get(`http://localhost:3000/files?id_user=${idUser}`)
            .then(function(response) {
                self.filesList = response.data;
            })
        },
        changeInfo: function(idItem) {
            if(this.change === true) {
                alert(idItem);
            }
        },
        deleteInfo: function(idItem) {
            if(this.delete === true) {
                alert(idItem);
            }
        },
        isDisabledChange: function(){
            return this.delete;
        },
        isDisabledDelete: function(){
            return this.change;
        },
        onChange: function() {
            this.change = !this.change;
        },
        onDelete: function() {
            this.delete = !this.delete;
        },
        
    }
})