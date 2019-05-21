<template>
  <div class="Testlink">
    <el-form ref="form" :model="form" label-width="100px" class="queryForm">
      <h3>{{ msg }}</h3>
      <el-row class="btn">
        <el-col class="sm-form-col">
          <el-form-item label="项目名称">
            <el-input style="width:90%" v-model="form.project_name" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col class="sm-form-col">
            <el-form-item>
              <el-button type="primary" @click="onSearch">
                <li class="el-icon-search el-icon--left"></li>查询
              </el-button>
            </el-form-item>
        </el-col> -->
        <!-- <el-col class="sm-form-col">
          <el-form-item label="项目ID">
            <el-autocomplete style="width:90%" class="inline-input" v-model="form.father_id" :fetch-suggestions="querySearch" placeholder="请输入内容(支持模糊查询)"></el-autocomplete>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row class="btn">      
        <el-upload
            class="upload-demo"
            action="http://10.10.2.188:8000/upload/test/case"  
            :data="form" 
            :before-upload="beforeAvatarUpload"   
            :on-success="uploadSuccess"       
            :auto-upload="true">
            <el-button slot="trigger" size="small" type="primary" icon="el-icon-upload">上传文件</el-button>
            <a href="./static/import.xlsx" rel="external nofollow" download="import"><el-button size="small" type="success">下载模板</el-button></a>
            <div slot="tip" class="el-upload__tip">只能上传excel</div>
        </el-upload>           
      </el-row>
    </el-form>
  </div>
</template>

<script>

import Api from "@/api/index"
    export default {
        name: 'Testlink',
        data() {
            return {
                msg: "Testlink文件导入",                
                form:
                {
                  project_name: "",  // project_name
                  father_id: ""
                },  //  father_id                
                father_idList: []
            
            }
        },

     watch:{

      //  father_id:{
      //     handler: function() {
      //       this.csvS = [];//这是定义好的用于存放下拉提醒框中数据的数组
      //       var len = this.father_idList.length;//father_idList
      //       var arr = [];
      //       for (var i = 0; i < len; i++) {//根据输入框中inputName的值进行模糊匹配
      //         if (this.father_idList[i].indexOf(this.inputName) >= 0) {
      //           arr.push(this.father_idList[i]);//符合条件的值都放入arr中
      //         }
      //       }
      //       console.log("arr",arr);
            
      //       //el-autocomplete元素要求数组内是对象，且有value属性，此处做一个格式调整
      //       for (var i = 0; i < arr.length; i++) {
      //         var obj = { value: "" };
      //         obj.value = arr[i];
      //         this.csvS.push(obj);
      //       }
      //     }
      //   }

     },

     mounted() {
        // this.onSearch();
    },

     methods: {
         querySearch(queryString, cb) {
          var csvS = this.csvS;
          cb(csvS);
          console.log("csvS",this.csvS)
          },

         // 上传文件校验 插入参数
         beforeAvatarUpload(file) {
             console.log("file.name", file.name.split('.')[file.name.split('.').length - 1])
             if (file.name.split('.')[file.name.split('.').length - 1] != 'xls' && file.name.split('.')[file.name.split('.').length - 1] != 'xlsx') {
                 this.$message({message: '上传文件格式错误，请上传xls、xlsx文件！', type: 'warning'});
                 return false
             }
             ;
             let self = this;
             if (self.form.project_name == "") {
                 this.$message({message: '请输入project_name', type: 'warning'});
                 return false
             }
             ;
            //  if (self.form.father_id == "") {
            //      this.$message({message: '请输入father_id', type: 'warning'});
            //      return false
            //  }
            //  ;
         },

         // 上传成功
         uploadSuccess(response, file, fileList) {
             let self = this;
            //  let res = JSON.parse(Base64.decode(response))
             console.log("uploadSuccess", response)
             if (response == '成功') {
                 console.log("uploadSuccess", response)
             } else {
                 console.log("uploadSuccess", "失败")
             }

             // this.onSearch();
         },

         // 根据project_name查询father_id
         onSearch() {
          
          let params = {};

          if (this.form.project_name)
            params.project_name = this.form.project_name;
          console.log("searchparams", params)

          Api
            .getfather_id(params)
              .then(res => {
                this.father_idList = res;
                this.csvS = [];//这是定义好的用于存放下拉提醒框中数据的数组
                //el-autocomplete元素要求数组内是对象，且有value属性，此处做一个格式调整
                for (var k in this.father_idList){
                  var obj = { value: "" };
                  obj.value = this.father_idList[k];
                  this.csvS.push(obj);
                }
                console.log("csvS",this.csvS)
              })
              .catch(function(error) {
                console.log("error " + error);
              });
          
          }
     }

    }
</script>

<style lang="scss" scoped>
$formColor: #ecf0f5;
$boxShadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.queryForm {
  padding-top: 15px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: $formColor;
  border: 1px solid #d8dce5;
  box-shadow: $boxShadow;
  .sm-form-col {
    width: 400px;
  }
  .date-range {
    width: 750px;
  }
  .sm-btn-col {
    width: 150px;
  }
}
</style>