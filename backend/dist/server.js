!function(e){var t={};function o(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:s})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=29)}([function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.success=function(e){return{type:"success",message:e,code:200}},e.error=function(e,t){return{type:"error",message:e,code:t}}}(t.JsonResponse||(t.JsonResponse={}))},function(e,t){e.exports=require("mongoose")},function(e,t,o){"use strict";var s=this&&this.__awaiter||function(e,t,o,s){return new(o||(o=Promise))(function(n,i){function r(e){try{d(s.next(e))}catch(e){i(e)}}function a(e){try{d(s.throw(e))}catch(e){i(e)}}function d(e){e.done?n(e.value):new o(function(t){t(e.value)}).then(r,a)}d((s=s.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const n=o(0);t.Repository=class{constructor(e){this.model=e,this.create=this.create.bind(this),this.updateById=this.updateById.bind(this),this.read=this.read.bind(this),this.remove=this.remove.bind(this)}create(e){return s(this,void 0,void 0,function*(){let t=new(0,this.model)(e);try{let e=yield this.model.create(t);return n.JsonResponse.success(e)}catch(e){return n.JsonResponse.error(e,500)}})}updateById(e,t){return s(this,void 0,void 0,function*(){try{let o=yield this.model.updateOne({_id:e},t);return n.JsonResponse.success(o)}catch(e){return n.JsonResponse.error(e,500)}})}read(e){return s(this,void 0,void 0,function*(){try{let t=yield this.model.findById(e);return n.JsonResponse.success(t)}catch(e){return n.JsonResponse.error(e,500)}})}readBy(e,t){return s(this,void 0,void 0,function*(){try{let e=yield this.model.findOne({field:t});return n.JsonResponse.success(e)}catch(e){return n.JsonResponse.error(e,500)}})}remove(e){return s(this,void 0,void 0,function*(){try{let t=yield this.model.findOneAndRemove({_id:e});return n.JsonResponse.success(t)}catch(e){return n.JsonResponse.error(e,500)}})}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=o(0);!function(e){e.is_allowed=function(e,t,o){const n=e.session;if(!n||!n.user)return t.status(500).json(s.JsonResponse.error("User not connected",500));o()}}(t.UserMiddleware||(t.UserMiddleware={}))},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=o(1),n=new s.Schema({country:{type:String,default:"FR",required:!0,index:!0,sparse:!0},spotify_id:{type:String,required:!0,unique:!0,index:!0,sparse:!0},spotify_link:{type:String,required:!0},spotify_api:{type:String,default:""},is_premium:{type:Boolean,required:!0,default:!1}},{_id:!1});let i=new s.Schema({email:{type:String,required:!0,unique:!0,index:!0},password:{type:String},spotify_infos:n,song_list:{type:[s.Schema.Types.ObjectId],default:[]},is_connected:{type:Boolean,required:!0,default:!1},createdAt:{type:Date,default:Date.now()},access_token:{type:String}});i.statics.findByMail=function(e,t){return this.findOne({email:e},t)},i.statics.connexion=function(e,t,o){return this.findByIdAndUpdate({_id:e},{is_connected:!0,access_token:t},{new:!0},o)},i.statics.pushSong=function(e,t,o){return this.findByIdAndUpdate({_id:e},{$push:{song_list:t}},{},o)},t.User=s.model("User",i)},function(e,t){e.exports=require("request")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=o(5),n=o(16);!function(e){const t=new n("SongWorker");e.initWorker=function(){t.process(10,(e,t)=>{console.log(`[${e.id}] Processing download on ${e.data.videoId}`),console.log("Requesting http://localhost:3000/song/ytdl?q="+e.data.keyword+"&origin=spotify"),s("http://localhost:3000/song/ytdl?q="+e.data.keyword+"&origin=spotify",{json:!0,body:{name:e.data.name,artists:e.data.artists}},(o,s,n)=>o||"error"==n.type?t("Error on job n°"+e.id,null):t(null,e.data))})},e.enQueue=function(e){t.createJob(e).save()}}(t.SongWorker||(t.SongWorker={}))},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.isUserValid=function(e){let t=e;return void 0!=t.email&&(void 0!=t.spotify_infos||void 0!=t.password)},e.isPlaylistValid=function(e){return void 0!=e.title},e.isSongValid=function(e){let t=e;return void 0!=t.name&&void 0!=t.artists&&void 0!=t.type&&void 0!=t.duration_ms&&void 0!=t.file_id}}(t.Checker||(t.Checker={}))},function(e,t){e.exports=require("connect-redis")},function(e,t){e.exports=require("express-session")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=o(1);let n=new s.Schema({title:{type:String,required:!0},songs:{type:[s.Schema.Types.ObjectId],default:[]},user:{type:s.Schema.Types.ObjectId,ref:"User"}});n.statics.findByTitle=function(e,t,o){return this.findOne({$and:[{title:e},{user:t}]},o)},n.statics.findByTitleAndRemove=function(e,t,o){return this.findOneAndRemove({$and:[{title:e},{user:t}]},o)},n.statics.addIntoPlaylist=function(e,t,o,s){return this.findOneAndUpdate({$and:[{title:e},{user:t}]},{$push:{songs:o}},{returnNewDocument:!0},s)},t.Playlist=s.model("Playlist",n)},function(e,t,o){"use strict";var s=this&&this.__awaiter||function(e,t,o,s){return new(o||(o=Promise))(function(n,i){function r(e){try{d(s.next(e))}catch(e){i(e)}}function a(e){try{d(s.throw(e))}catch(e){i(e)}}function d(e){e.done?n(e.value):new o(function(t){t(e.value)}).then(r,a)}d((s=s.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const n=o(2),i=o(7),r=o(0),a=o(3),d=o(1),c=o(10);t.PlaylistController=class{constructor(e){this.model=c.Playlist,this.repo=new n.Repository(this.model),this.create=this.create.bind(this),this.display=this.display.bind(this),this.delete=this.delete.bind(this),this.addSong=this.addSong.bind(this),e.post("/playlist/create",a.UserMiddleware.is_allowed,this.create),e.get("/playlist/:title",a.UserMiddleware.is_allowed,this.display),e.delete("/playlist/:title",a.UserMiddleware.is_allowed,this.delete),e.post("/playlist/:title/add/:idsong",a.UserMiddleware.is_allowed,this.addSong)}create(e,t){return s(this,void 0,void 0,function*(){const o=e.body;if(!i.Checker.isPlaylistValid(o))return t.json(r.JsonResponse.error("Body not valid",500));this.model.findByTitle(o.title,e.session.user._id,(n,i)=>s(this,void 0,void 0,function*(){if(n)return t.json(r.JsonResponse.error(n,500));if(i)return t.json(r.JsonResponse.error(o.title+" already exist",500));const s=yield this.repo.create({title:o.title,user:new d.Types.ObjectId(e.session.user._id)});return t.json(s)}))})}display(e,t){const o=e.params.title;this.model.findByTitle(o,e.session.user._id,(e,s)=>e?t.json(r.JsonResponse.error(e,200)):s?t.json(r.JsonResponse.success(s)):t.json(r.JsonResponse.error(o+" does not exist",400)))}delete(e,t){const o=e.params.title;this.model.findByTitleAndRemove(o,e.session.user._id,(e,o)=>e?t.json(r.JsonResponse.error(e,200)):t.json(r.JsonResponse.success("Deleted")))}addSong(e,t){const o=e.params.title,s=e.params.idsong;this.model.addIntoPlaylist(o,e.session.user._id,s,(e,o)=>e||!o?t.json(r.JsonResponse.error(e,500)):t.json(r.JsonResponse.success(o)))}}},function(e,t){e.exports=require("mp3-duration")},function(e,t){e.exports=require("youtube-dl")},function(e,t){e.exports=require("multer")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("bee-queue")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.arrTimeToMs=function(e){return 3==e.length?(e[0]=60*e[0]*60*1e3,e[1]=60*e[1]*1e3,e[2]=1e3*e[2]):2==e.length?(e[0]=60*e[0]*1e3,e[1]=1e3*e[1]):e[0]=1e3*e[0],e.reduce((e,t)=>e+t,0)}}(t.ArrayHelper||(t.ArrayHelper={}))},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=o(1);var n;!function(e){e.SPOTIFY="spotify",e.UPLOAD="upload",e.LINK="link"}(n=t.SongType||(t.SongType={}));let i=new s.Schema({name:{type:String,required:!0},image_cover:{type:String,default:"default.png"},artists:{type:[String],required:!0},type:{type:String,enum:[n.LINK,n.SPOTIFY,n.UPLOAD],required:!0},duration_ms:{type:Number,required:!0,min:0},uri:{type:String,required:!1},file_id:{type:s.Schema.Types.ObjectId,required:!0},added_at:{type:Date,required:!0,default:Date.now()}});i.statics.listSongByObjId=function(e,t){return this.find({_id:{$in:e}},t)},t.Song=s.model("Song",i)},function(e,t,o){"use strict";var s=this&&this.__awaiter||function(e,t,o,s){return new(o||(o=Promise))(function(n,i){function r(e){try{d(s.next(e))}catch(e){i(e)}}function a(e){try{d(s.throw(e))}catch(e){i(e)}}function d(e){e.done?n(e.value):new o(function(t){t(e.value)}).then(r,a)}d((s=s.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const n=o(18),i=o(4),r=o(1),a=o(2),d=o(17),c=o(0),u=o(3),l=o(6),p=o(5),f=o(15),h=o(14);let y=o(13),g=o(12);t.SongController=class{constructor(e,t){this.repo=new a.Repository(n.Song),this._gridfs=t;let o=h.diskStorage({destination:function(e,t,o){o(null,"./musictmp/")},filename:function(e,t,o){"audio/mpeg"==t.mimetype||"audio/mp3"==t.mimetype?o(null,"music_"+t.originalname.toLowerCase().replace(/\s+/g,"+")):o(new Error("file is not an mp3 format"),null)}});this._upload=h({storage:o}),this.youtubeDownload=this.youtubeDownload.bind(this),this.pushToDb=this.pushToDb.bind(this),this.getListOfSpotifySongs=this.getListOfSpotifySongs.bind(this),this.songUpload=this.songUpload.bind(this),this.loadSong=this.loadSong.bind(this),this.streamSong=this.streamSong.bind(this),this.loadSongs=this.loadSongs.bind(this),this.deletesong=this.deletesong.bind(this),e.post("/song/ytdl",u.UserMiddleware.is_allowed,this.youtubeDownload,this.pushToDb),e.post("/song/spotifytracks",u.UserMiddleware.is_allowed,this.getListOfSpotifySongs),e.post("/song/upload",u.UserMiddleware.is_allowed,this.songUpload,this.pushToDb),e.get("/song/stream/:id",u.UserMiddleware.is_allowed,this.streamSong),e.get("/song/:id",u.UserMiddleware.is_allowed,this.loadSong),e.post("/song/list",u.UserMiddleware.is_allowed,this.loadSongs),e.post("/song/remove/:id",u.UserMiddleware.is_allowed,this.deletesong)}songUpload(e,t,o){this._upload.single("song")(e,t,s=>{if(s)return console.log(s),t.status(500).json(c.JsonResponse.error(s,500));const i=e.file,r=e.body;g(i.path,(e,s)=>{t.locals.info={duration:1e3*s,artist:r.artists.split(","),cover:r.cover,name:r.name},t.locals.codeVideo=i.path,t.locals.origin=n.SongType.UPLOAD,o()})})}youtubeDownload(e,t,o){const s=e.query.q,i=e.query.origin.toLowerCase()==n.SongType.SPOTIFY?n.SongType.SPOTIFY:n.SongType.LINK;let r=e.body;console.log(e.body),p({url:"https://m.youtube.com/results?client=mv-google&hl=fr&gl=FR&q="+s+"+audio&submit=Rechercher",method:"GET",gzip:!0},(e,s,a)=>{let u=unescape(a).match(/watch\?v=(.*?)+"/)[0].match(/watch\?v=(.*?)\"/)[1],l="http://www.youtube.com/watch?v="+u;y.getInfo(l,[],(e,s)=>{if(e)throw e;let a=[];s.duration.split(":").forEach(e=>{a.push(parseInt(e))});const p=d.ArrayHelper.arrTimeToMs(a);t.locals.codeVideo=u,t.locals.origin=i,t.locals.info={duration:p,artist:r.artists?r.artists.split(","):s.uploader,name:r.name?r.name:s.title,cover:r.cover?r.cover:"https://i.ytimg.com/vi/"+u+"/maxresdefault.jpg"},i==n.SongType.SPOTIFY&&(t.locals.info.artist=r.artists.map(e=>e.name)),console.log("Downloading -> ",u," waiting..."),y.exec(l,["-x","--audio-format","mp3","-o","./musictmp/music_"+u+".mp3"],{},(e,s)=>e?t.status(500).json(c.JsonResponse.error("Can't download youtube video "+u,500)):o())})})}pushToDb(e,t,o){console.log("Done finished downloading ",t.locals.info.name);let r=this._gridfs.openUploadStream(t.locals.codeVideo,{metadata:t.locals.info});const a=t.locals.origin==n.SongType.UPLOAD?t.locals.codeVideo:"./musictmp/music_"+t.locals.codeVideo+".mp3";f.createReadStream(a).pipe(r);let d=this;f.unlink(a,o=>{if(o)return t.status(500).json(c.JsonResponse.error(o,500));r.once("finish",function(){return s(this,void 0,void 0,function*(){let o=t.locals.info.artist instanceof Array?t.locals.info.artist:[t.locals.info.artist],s=yield d.repo.create({name:t.locals.info.name,image_cover:t.locals.info.cover,artists:o,type:t.locals.origin,duration_ms:t.locals.info.duration,file_id:r.id});i.User.pushSong(e.session.user._id,s.message._id,(e,o)=>e?t.status(500).json(c.JsonResponse.error(e,500)):t.json(s))})})})}getListOfSpotifySongs(e,t,o){let s=e.body.at,n=0,i=0;p("https://api.spotify.com/v1/me/tracks?limit=50&offset="+n,{json:!0,headers:{Authorization:"Bearer "+s}},(e,o,s)=>e||s.error?t.status(403).json(c.JsonResponse.error("Access token expired",403)):(n+=50,i=s.total,s.items.forEach(e=>{const t=e.track.artists;let o=e.track.name;t.length>0&&(o+=" "+t[0].name),o=o.replace(/\s+/g,"+"),console.log("Enqueuing spotify:",e.track.id," - ",o),l.SongWorker.enQueue({videoId:e.track.id,keyword:o,artists:t,name:e.track.name})}),t.json(s)))}loadSong(e,t){const o=e.params.id;n.Song.findById(o,(e,o)=>t.json(c.JsonResponse.success(o)))}loadSongs(e,t){const o=e.body;n.Song.listSongByObjId(o.data,(e,o)=>t.json(c.JsonResponse.success(o)))}streamSong(e,t){const o=e.params.id;t.set("content-type","audio/mp3"),t.set("accept-ranges","bytes");try{var s=new r.mongo.ObjectId(o)}catch(e){return t.status(400).json(c.JsonResponse.error("Incorrect ID",400))}let n=this._gridfs.openDownloadStream(s);n.on("data",e=>{t.write(e)}),n.on("error",()=>{t.sendStatus(404)}),n.on("end",()=>{t.end()})}deletesong(e,t){let o=e.params.id,s=this;n.Song.findByIdAndRemove(o,(o,n)=>{if(o)return t.status(500).json(c.JsonResponse.error(o,500));i.User.update({_id:r.Types.ObjectId(e.session.user._id)},{$pull:{song_list:r.Types.ObjectId(n._id)}},(e,o)=>{if(e)return console.log(e),t.status(500).json(c.JsonResponse.error(e,500));s._gridfs.delete(n.file_id,e=>e?(console.log(e),t.status(500).json(c.JsonResponse.error(e,500))):t.json(c.JsonResponse.success("Song deleted")))})})}}},function(e,t){e.exports=require("bcrypt")},function(e,t,o){"use strict";var s=this&&this.__awaiter||function(e,t,o,s){return new(o||(o=Promise))(function(n,i){function r(e){try{d(s.next(e))}catch(e){i(e)}}function a(e){try{d(s.throw(e))}catch(e){i(e)}}function d(e){e.done?n(e.value):new o(function(t){t(e.value)}).then(r,a)}d((s=s.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const n=o(4),i=o(2),r=o(7),a=o(0),d=o(3),c=o(20);t.UserController=class{constructor(e){this.repo=new i.Repository(n.User),this.register=this.register.bind(this),this.connexion=this.connexion.bind(this),this.logout=this.logout.bind(this),this.getCurrentSession=this.getCurrentSession.bind(this),e.post("/user/register",this.register),e.post("/user/connexion",this.connexion),e.post("/user/logout",d.UserMiddleware.is_allowed,this.logout),e.get("/user/session",d.UserMiddleware.is_allowed,this.getCurrentSession)}register(e,t){return s(this,void 0,void 0,function*(){let o=JSON.parse(e.body);if(r.Checker.isUserValid(o)){if(void 0!=o.password){let e=c.hashSync(o.password,10);o.password=e;const s=yield this.repo.create(o);return t.json(s)}{const e=yield this.repo.create(o);return t.json(e)}}return t.json(a.JsonResponse.error("User not valid",400))})}connexion(e,t){let o=e.body;if(void 0==o.email||void 0==o.password)return t.status(500).json(a.JsonResponse.error("No email or password",400));n.User.findByMail(o.email,(s,i)=>s?t.status(400).json(a.JsonResponse.error("Mail not found",400)):i.is_connected?t.status(500).json(a.JsonResponse.error("Already connected",500)):void c.compare(o.password,i.password,(o,s)=>{if(o||!s)return t.status(400).json(a.JsonResponse.error("Incorrect password",400));n.User.findByIdAndUpdate(i._id,{is_connected:!0},(o,s)=>o?t.status(500).json(a.JsonResponse.error("Something went wrong :(",500)):(i.is_connected=!0,e.session.user=i,t.json(a.JsonResponse.success(i))))}))}getCurrentSession(e,t){return e.session.user?t.json(a.JsonResponse.success(e.session.user)):t.status(500)}logout(e,t){n.User.findByIdAndUpdate(e.session.user._id,{is_connected:!1},(o,s)=>o?t.status(500).json(a.JsonResponse.error(o,500)):(e.session.destroy(),t.json(a.JsonResponse.success("Successfull disconnect"))))}}},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.dbHost="localhost",e.dbPort="27017",e.dbName="webify"}(t.DBConfig||(t.DBConfig={}))},function(e,t){e.exports=require("querystring")},function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=o(23);!function(e){const t="1ba80100e92d4d49870b7e4fc4931720",o="3da3164990b4482dbdeb3bc941a07466",n="http://localhost:8080/spotify-login";e.spotifyStateKey="spotify_auth_state",e.giveState=function(e){let t="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(let s=0;s<e;s++)t+=o.charAt(Math.floor(Math.random()*o.length));return t},e.connexion=function(e,o){return s.stringify({response_type:"code",client_id:t,scope:e,redirect_uri:n,state:o})},e.authentificationOptions=function(e){return{url:"https://accounts.spotify.com/api/token",form:{code:e,redirect_uri:n,grant_type:"authorization_code"},headers:{Authorization:"Basic "+new Buffer(t+":"+o).toString("base64")},json:!0}}}(t.SpotifyConfig||(t.SpotifyConfig={}))},function(e,t,o){"use strict";var s=this&&this.__awaiter||function(e,t,o,s){return new(o||(o=Promise))(function(n,i){function r(e){try{d(s.next(e))}catch(e){i(e)}}function a(e){try{d(s.throw(e))}catch(e){i(e)}}function d(e){e.done?n(e.value):new o(function(t){t(e.value)}).then(r,a)}d((s=s.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const n=o(24),i=o(5),r=o(2),a=o(4),d=o(0);!function(e){e.spotify_login=function(e,t){let o=n.SpotifyConfig.giveState(16);t.cookie(n.SpotifyConfig.spotifyStateKey,o,{maxAge:9e5,httpOnly:!0});const s=n.SpotifyConfig.connexion("user-read-private user-read-email user-library-read",o);return t.json(s)},e.spotify_redirect=function(e,t){let o=e.query.code||null,c=e.query.state||null;e.cookies&&e.cookies[n.SpotifyConfig.spotifyStateKey];const u=new r.Repository(a.User);if(null===c)return t.json({error:"State undefined or different"});{t.clearCookie(n.SpotifyConfig.spotifyStateKey);let r=n.SpotifyConfig.authentificationOptions(o);i.post(r,function(o,n,r){if(o||200!==n.statusCode)return t.json({error:"Unvalidate token"});var c=r.access_token,l=(r.refresh_token,{url:"https://api.spotify.com/v1/me",headers:{Authorization:"Bearer "+c},json:!0});i.get(l,function(o,n,i){a.User.findByMail(i.email,(o,n)=>s(this,void 0,void 0,function*(){if(o)return t.json(d.JsonResponse.error(o,500));if(console.log(c),!n){let o=yield u.create({email:i.email,is_connected:!0,access_token:c,spotify_infos:{country:i.country,spotify_id:i.id,is_premium:"premium"==i.product,spotify_link:i.href,spotify_api:i.href}});return"error"!=o.type&&(e.session.user=o.message),t.json(o)}a.User.connexion(n._id,c,(o,s)=>(e.session.user=s,t.json(d.JsonResponse.success({user:s}))))}))})})}}}(t.HelperSpotify||(t.HelperSpotify={}))},function(e,t){e.exports=require("cookie-parser")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("express")},function(e,t,o){"use strict";(function(s){Object.defineProperty(t,"__esModule",{value:!0});const n=o(28),i=o(27),r=o(26),a=o(1),d=o(25),c=o(22),u=o(21),l=o(19),p=o(11),f=o(6),h=n(),y=o(9);o(8)(y);h.use(y({secret:"IOuL85f4a10lNbs",resave:!0,saveUninitialized:!0,maxAge:864e5})),h.set("port",process.env.PORT||3e3),h.set("portSocket",process.env.PORTSOCKET||4808),h.set("trust proxy",1),h.use(i.json()),h.use(n.urlencoded({extended:!0})),h.use(n.static(s+"/public")).use(r()),h.use((e,t,o)=>{t.header("Access-Control-Allow-Origin","http://localhost:8080"),t.header("Access-Control-Allow-Credentials","true"),t.header("Access-Control-Allow-Methods","GET,POST,DELETE"),t.header("Access-Control-Allow-Headers","Origin, X-Requested With, Content-Type, Accept"),o()}),a.connect("mongodb://"+c.DBConfig.dbHost+":"+c.DBConfig.dbPort+"/"+c.DBConfig.dbName),h.get("/spotify-login",d.HelperSpotify.spotify_login),h.get("/spotify-redirect",d.HelperSpotify.spotify_redirect),a.connection.once("open",()=>{let e=new a.mongo.GridFSBucket(a.connection.db);new u.UserController(h),new l.SongController(h,e),new p.PlaylistController(h);h.listen(h.get("port"),()=>{console.log("App is running at http://localhost:%d",h.get("port")),console.log("Press CTRL-C to stop\n"),f.SongWorker.initWorker()})}),e.exports=h}).call(this,"/")}]);