var app = new Vue({
    el: '#myapp',
    data() {
        return {
            instruction: false,
            reversePage: false,
            namePage: "Профили",
            anotherUser: false,
            filesAnyUser: [],

            users: [],
            listProfile: true,

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

            varFilter: 'public',
            filterFiles: false,
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
        isEmpty: function (obj) {
            for (let key in obj) {
              return false;
            }
            return true;
        },
        getListFileByUser: function() {
            let self = this;
            axios.get(`http://localhost:3000/users?login=${self.userLogin}&role=3`)
            .then(function(response) {
                if(!self.isEmpty(response.data)) {
                    self.getFilesById(response.data[0]['id']);
                }
            })
        },
        getFilesById: function(idUser) {
            let self = this;
            axios.get(`http://localhost:3000/files?id_user=${idUser}`)
            .then(function(response) {
                self.filesList = response.data;
                self.onFilter();
            })
        },
        changeInfo: function(idItem, idUser, name) {
            let self = this;
            newInfo = {
                "id_user": idUser,
                "name_file": name,
                "status_file": self.newStatus ? "private" : "public",
                "text": self.newText,
            }
            if(this.change === true) {
                axios.put(`http://localhost:3000/files/${idItem}`, newInfo)
                .then(function() {
                    self.getListFileByUser()
                })
            }
        },
        deleteInfo: function(idItem, name) {
            let self = this;
            if(this.delete === true) {
                axios.delete(`http://localhost:3000/files/${idItem}`)
                .then(function() {
                    self.deleteFile(name);
                })
            }
        },
        deleteFile: function(name) {
            let self = this;
            let login = this.userLogin;
            axios({
                method: 'post',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'login': login
                },
                url: 'deleteF.php',
                data: name
            }).then(function() {
               self.getListFileByUser()
            })
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
        changePage: function() {
            this.reversePage = !this.reversePage;
            this.namePage = this.reversePage ? "Файлы" : "Профили";
            let self = this;
            axios.get('http://localhost:3000/users?role=3')
            .then(function(response) {
                self.users = response.data;
            })
        },
        onProfile: function(userID) {
            let self = this;
            if(this.reversePage) {
                self.anotherUser = true;
                axios.get(`http://localhost:3000/files?id_user=${userID}&status_file=public`)
                .then(function(response) {
                    self.filesAnyUser = response.data;
                })
            }
        },
        loadFile: async function(fileName, userID) {
            let userName = '';
            await axios.get(`http://localhost:3000/users/${userID}`)
            .then((response) => {
                userName = response.data['login'];
			})
            await axios.get(`http://localhost/lb3/users/${userName}/${fileName}`, 
            {
                responseType: 'blob'
            })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${fileName}`);
                document.body.appendChild(link);
                link.click();
			})
        },
        onFilter: function() {
            let self = this;
            this.filterFiles = !this.filterFiles;
            this.varFilter = this.filterFiles ? "public" : "private";
            if(this.filterFiles) {
                self.filesList.sort(function(a, b) {
                    return a.status_file > b.status_file ? 1 : -1;
                });
            } else {
                self.filesList.sort(function(a, b) {
                    return b.status_file > a.status_file ? 1 : -1;
                });
            }
        }
    }
})