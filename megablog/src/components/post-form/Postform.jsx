import PropTypes from "prop-types";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button, RTE , CustomSelect as Select} from "../index";
import { useCallback  , useEffect} from "react";
import service from "../../appwrite/corfig";
import { useForm } from "react-hook-form";

const Postform = ({ post }) => {

  const {register , handleSubmit , setValue, watch , control , getValues} = useForm({
    defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
    },
});
 
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const submit = async (data) => {
    try {
      if (post) {
const file = data.featuredImage && data.featuredImage[0]
  ? service.uploadFile(data.featuredImage[0])
  : null;

        if (file) {
          service.deletedFile(post.featuredImage);
        }
        const dbPost = await service.updatepost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`post/${dbPost.$id}`);
        }
      } else {
        console.log("data.featuredImage:", data.featuredImage);

        const file = service.uploadFile(data.featuredImage[0]);
        if (file) {
          const createdPost = service.createPost({
            data,
            userId: userData.$id,
          });
          if (createdPost) {
            navigate(`post/${createdPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
      .trim()
      .toLowerCase()
      .replace(/^[a-zA-Z\d\s]+/g , '-')
      .replace(/\s/g, '-')
    return ;
  }, []);


useEffect(() => {
    const subscription = watch((value,{name})=>{
if (name === 'title'){
  setValue('slug' , slugTransform(value.title , {shouldValidate : true}))
}  
    })

    return ()=>{
      subscription.unsubscribe();
    }
}, [watch , slugTransform  , setValue ])


  return ( <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
  <div className="w-2/3 px-2">
      <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
      />
     <Input
  label="slug "
  placeholder="slug"
  className="mb-4"
  {...register("slug", { required: true })}
  onInput={(e) => {
    setValue('slug', slugTransform(e.target.value), { shouldValidate: true });
  }}
/>

      <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
  </div>
  <div className="w-1/3 px-2">
      <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
      />
      {post && (
          <div className="w-full mb-4">
              <img
                  src={ service.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
              />
          </div>
      )}
      <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
      />
      <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="w-full bg-red-600 font-bold"text="Submit" onSubmit={handleSubmit(submit)}>
          {post ? "Update" : "Submit"}
      </Button>
  </div>
</form>)
};


Postform.propTypes = {
  post: PropTypes.shape({
    $id: PropTypes.string ,
    title: PropTypes.string ,
    featuredImage: PropTypes.string ,
    content: PropTypes.string ,
    status: PropTypes.oneOf(["active", "inactive"]) , // Add prop validation for status
  
  }) ,
};


export default Postform;
