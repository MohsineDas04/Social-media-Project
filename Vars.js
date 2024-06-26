let AllInputs = document.querySelectorAll("input");
// console.log(AllInputs);
let commentShowField = document.getElementById("commentShowField");
let NavBar = document.getElementById("NavBar");
let showdiv = document.getElementById("PostsDiv");
let addpostdiv = document.getElementById("addpostdiv");
let emailtologin = document.getElementById("emailtolog");
let passtologin = document.getElementById("passtolog");
// console.log(emailtolog, passtolog);
let token;
let tagsDiv = document.getElementById("TagsDiv");
let LoginProcessStatus = document.getElementById("ifissue");
let LRL = document.getElementById("LRL");
// console.log(tagsDiv);
showdiv.innerHTML = "";
let PostingStatus = document.getElementById("ifissue2");
//
// Post Elements
let CPTitle = document.getElementById("PostTitleInp");
let CPBody = document.getElementById("PostBodyInp");
let CPImage = document.getElementById("PostImageInp");

// console.log(CPBody);
// console.log(CPImage);
//
// Login modal close behavior
let LoginModal = document.getElementById("LoginF");
let closemodalbtn = document.getElementById("ModalCloseBtn");
let PostModalClose = document.getElementById("PostModalClose");
//
// Registering A user Elements
let UsernameR = document.getElementById("UsernameR");
let PasswordR = document.getElementById("PasswordR");
let ProfilePictureR = document.getElementById("PorfilePicR");
let FullnameR = document.getElementById("FullnameR");
let EmailR = document.getElementById("EmailR");
let RegisteringStatus = document.getElementById("ifissue3");
let RegisteringModalClose = document.getElementById("RegisteringModalClose");

// // console.log(
//    UsernameR,
//    PasswordR,
//    ProfilePictureR,
//    FullnameR,
//    EmailR,
//    RegisteringStatus,
//    RegisteringModalClose
// );
//
// AddingComment
let commentAdding = document.getElementById("CommentAdding");
let PostAddComm = document.getElementById("PostCommentButton");
let CommentingStatus = document.getElementById("ifissue4comment");
let AddCommentModalClose = document.getElementById("AddCommentModalClose");
// let
let ShowingPostsIssue = document.getElementById("ShowingPostsIssue");
let issuecontainer = document.getElementById("issuecontainer");
// Editing modal post
let createPostModal = document.getElementById("CreatePostModal");
let DefaultPostingModal = createPostModal.innerHTML;

let SubmitchangesBtn = document.getElementById("SubmitchangesBtn");
let EditPostStatus = document.getElementById("ifissueEditing");

// dleet post
let DeletePostModalClose = document.getElementById("DeletePostModalClose");
let ConfirmDeletePost = document.getElementById("ConfirmDeletePost");
let CancelDeletePost = document.getElementById("CancelDeletePost");
let DeletePostStatus = document.getElementById("ifissueDeleting");
// Functions
// function GetPostingModalToDefault() {
//     createPostModal.innerHTML = `

//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h1 class="modal-title fs-5" id="exampleModalLabel">Add a new post</h1>
//         <button type="button" id="PostModalClose" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//         <form>
//           <div class="mb-3">
//             <label for="recipient-name" class="col-form-label">Post Title : </label>
//             <input type="text" class="form-control" id="PostTitleInp">
//           </div>
//           <div class="mb-3">
//             <label for="message-text" class="col-form-label">Post Body : </label>
//             <input type="text" class="form-control" id="PostBodyInp">
//           </div>
//           <div id="PostingImage" class="mb-3">
//             <label for="message-text" class="col-form-label">Post Image : </label>
//             <input type="file" id="PostImageInp">
//           </div>
//           <div id="ifissue2"></div>
//         </form>
//       </div>
//       <div class="modal-footer">
//         <button style="padding: 3px 15px; border-radius: 11111px; background: rgb(123, 123, 158); margin: auto; border: none;" onclick="CreatePost()">Create Post</button>
//       </div>
//     </div>
//   </div>

//     `;
// }
/// Functions

// console.log(ConfirmDeletePost);

let ShowEditDeleteBtns = document.getElementById("ShowEditDeleteBtns");

// console.log(CPBody);

let ProfileLinkShow = document.getElementById("ProfileLinkShow");

dfbdfbdfbdfbfdsvsv;

// setInterval(() => {
//     console.clear()
// }, 6000);
