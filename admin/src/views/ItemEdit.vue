<template>
  <div>
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <el-form label-width="80px"
             @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents"
                     :key="item._id"
                     :label="item.name"
                     :value="item._id"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload class="avatar-uploader"
                   :action="uploadUrl"
                   :headers="getAuthHeaders()"
                   :show-file-list="false"
                   :on-success="afterUpload">
          <img v-if="model.icon"
               :src="model.icon"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {}
        // parents: []
      };
    },
    methods: {
      async afterUpload(res) {
        let newModel = {
          icon: res.url
        };
        this.model = await Object.assign({}, this.model, newModel);
        // await this.$set(this.model, "icon", res.url);
      },
      async save() {
        let res;
        if (this.id) {
          res = await this.$http.put(`items/${this.id}`, this.model);
        } else {
          res = await this.$http.post("items", this.model);
        }
        this.$router.push("/items/list");
        this.$message({
          type: "success",
          message: "保存成功"
        });
      },
      async fetch() {
        const res = await this.$http.get(`items/${this.id}`);
        this.model = res.data;
      }
    },
    created() {
      this.id && this.fetch();
    }
  };
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>