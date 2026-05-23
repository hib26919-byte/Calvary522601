const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-BfBGUvRd.js","assets/vendor-N1IWtxBh.js","assets/firebase-DUiZd7X4.js","assets/defaultContent-CJkOBWwn.js","assets/ScriptureVerse-pKhGWpJ7.js","assets/ScriptureVerse-Be1_mW-v.css","assets/ChildrensMinistryCard-Dbe9N46e.js","assets/ChildrensMinistryCard-18BHP5Pn.css","assets/MinistryArtSection-MGu9eQNs.js","assets/MinistryArtSection-BmYmPm0H.css","assets/ImpactStats-CZj94xxh.js","assets/ImpactStats-G8q0Vi_g.css","assets/HomePage-CRiPXrxC.css","assets/AboutPage-qFBKqqfJ.js","assets/AboutPage-C8zdZ6Xk.css","assets/MinistriesPage-B7SWAUGi.js","assets/TribalOutreachPage-DElNBs9o.js","assets/GalleryGrid-B9VgHfnx.js","assets/GalleryGrid-B7-6MlDB.css","assets/ChildrensMinistryPage-BNg2BZjM.js","assets/GalleryPage-Cq6VAHP-.js","assets/ContactPage-D6w_6TeM.js","assets/ContactPage-HfWMuqj9.css","assets/NotFoundPage-D3gJE1G9.js","assets/AdminLogin-BTYNImVe.js","assets/AdminLogin-CCMXuDO-.css","assets/AdminDashboard-CbMZlJ2f.js","assets/AdminDashboard-laPq7-jS.css","assets/AdminHome-BX-NbEMV.js","assets/charts-D5_U1yqs.js","assets/AdminPages-DZmsjy1C.js","assets/imgbb-CUk5JOQe.js","assets/ImageUploader-CFw_Pu7D.js","assets/AdminPages-Dt02DXt3.css","assets/AdminGallery-CTgoqRP9.js","assets/AdminFestivalBanner-CN7tYqSl.js","assets/AdminChatbot-C4Pk8ft_.js","assets/AdminMessages-DPdBxgJr.js","assets/AdminAnalytics-BqqwDnO1.js","assets/AdminSettings-CrA5kuoM.js"])))=>i.map(i=>d[i]);
import{e as d,r as Dt,R as Ke,N as V,u as fe,L as D,a as de,B as Mt,c as $t,b as y}from"./vendor-N1IWtxBh.js";import{a as B,C as G,B as M,S as Ft,F as ge,q as _e,_ as z,m as Ut,j as We,f as qt,E as Ye,y as Vt,L as Bt,t as Je,u as Xe,K as Qe,d as Ae,c as Ze,g as Gt,s as zt,k as Ht,p as Kt,w as Wt,i as $,n as Y,I as U,J as be,D as ye,H as Yt,x as et,A as Jt,e as Xt,z as Qt,o as Zt,G as tt,r as nt}from"./firebase-DUiZd7X4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();var at={exports:{}},ee={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var en=d,tn=Symbol.for("react.element"),nn=Symbol.for("react.fragment"),an=Object.prototype.hasOwnProperty,sn=en.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,rn={key:!0,ref:!0,__self:!0,__source:!0};function st(e,t,n){var a,i={},r=null,o=null;n!==void 0&&(r=""+n),t.key!==void 0&&(r=""+t.key),t.ref!==void 0&&(o=t.ref);for(a in t)an.call(t,a)&&!rn.hasOwnProperty(a)&&(i[a]=t[a]);if(e&&e.defaultProps)for(a in t=e.defaultProps,t)i[a]===void 0&&(i[a]=t[a]);return{$$typeof:tn,type:e,key:r,ref:o,props:i,_owner:sn.current}}ee.Fragment=nn;ee.jsx=st;ee.jsxs=st;at.exports=ee;var s=at.exports,he={},Ee=Dt;he.createRoot=Ee.createRoot,he.hydrateRoot=Ee.hydrateRoot;const on="modulepreload",cn=function(e){return"/"+e},ke={},v=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(n.map(c=>{if(c=cn(c),c in ke)return;ke[c]=!0;const u=c.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${m}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":on,u||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((g,h)=>{f.addEventListener("load",g),f.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return i.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const it="firebasestorage.googleapis.com",ln="storageBucket",un=2*60*1e3,dn=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k extends ge{constructor(t,n,a=0){super(oe(t),`Firebase Storage: ${n} (${oe(t)})`),this.status_=a,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,k.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return oe(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var E;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(E||(E={}));function oe(e){return"storage/"+e}function hn(){const e="An unknown error occurred, please check the error payload for server response.";return new k(E.UNKNOWN,e)}function mn(){return new k(E.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function pn(){return new k(E.CANCELED,"User canceled the upload/download.")}function fn(e){return new k(E.INVALID_URL,"Invalid URL '"+e+"'.")}function gn(e){return new k(E.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function Re(e){return new k(E.INVALID_ARGUMENT,e)}function rt(){return new k(E.APP_DELETED,"The Firebase app was deleted.")}function _n(e){return new k(E.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let a;try{a=j.makeFromUrl(t,n)}catch{return new j(t,"")}if(a.path==="")return a;throw gn(t)}static makeFromUrl(t,n){let a=null;const i="([A-Za-z0-9.\\-_]+)";function r(T){T.path.charAt(T.path.length-1)==="/"&&(T.path_=T.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+i+o,"i"),c={bucket:1,path:3};function u(T){T.path_=decodeURIComponent(T.path)}const m="v[A-Za-z0-9_]+",f=n.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",h=new RegExp(`^https?://${f}/${m}/b/${i}/o${g}`,"i"),_={bucket:1,path:3},b=n===it?"(?:storage.googleapis.com|storage.cloud.google.com)":n,p="([^?#]*)",w=new RegExp(`^https?://${b}/${i}/${p}`,"i"),A=[{regex:l,indices:c,postModify:r},{regex:h,indices:_,postModify:u},{regex:w,indices:{bucket:1,path:2},postModify:u}];for(let T=0;T<A.length;T++){const H=A[T],ie=H.regex.exec(t);if(ie){const Lt=ie[H.indices.bucket];let re=ie[H.indices.path];re||(re=""),a=new j(Lt,re),H.postModify(a);break}}if(a==null)throw fn(t);return a}}class bn{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yn(e,t,n){let a=1,i=null,r=null,o=!1,l=0;function c(){return l===2}let u=!1;function m(...p){u||(u=!0,t.apply(null,p))}function f(p){i=setTimeout(()=>{i=null,e(h,c())},p)}function g(){r&&clearTimeout(r)}function h(p,...w){if(u){g();return}if(p){g(),m.call(null,p,...w);return}if(c()||o){g(),m.call(null,p,...w);return}a<64&&(a*=2);let A;l===1?(l=2,A=0):A=(a+Math.random())*1e3,f(A)}let _=!1;function b(p){_||(_=!0,g(),!u&&(i!==null?(p||(l=2),clearTimeout(i),f(0)):p||(l=1)))}return f(0),r=setTimeout(()=>{o=!0,b(!0)},n),b}function vn(e){e(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wn(e){return e!==void 0}function Ne(e,t,n,a){if(a<t)throw Re(`Invalid value for '${e}'. Expected ${t} or greater.`);if(a>n)throw Re(`Invalid value for '${e}'. Expected ${n} or less.`)}function xn(e){const t=encodeURIComponent;let n="?";for(const a in e)if(e.hasOwnProperty(a)){const i=t(a)+"="+t(e[a]);n=n+i+"&"}return n=n.slice(0,-1),n}var J;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(J||(J={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function In(e,t){const n=e>=500&&e<600,i=[408,429].indexOf(e)!==-1,r=t.indexOf(e)!==-1;return n||i||r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{constructor(t,n,a,i,r,o,l,c,u,m,f,g=!0){this.url_=t,this.method_=n,this.headers_=a,this.body_=i,this.successCodes_=r,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=c,this.timeout_=u,this.progressCallback_=m,this.connectionFactory_=f,this.retry=g,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((h,_)=>{this.resolve_=h,this.reject_=_,this.start_()})}start_(){const t=(a,i)=>{if(i){a(!1,new K(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const o=l=>{const c=l.loaded,u=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(c,u)};this.progressCallback_!==null&&r.addUploadProgressListener(o),r.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(o),this.pendingConnection_=null;const l=r.getErrorCode()===J.NO_ERROR,c=r.getStatus();if(!l||In(c,this.additionalRetryCodes_)&&this.retry){const m=r.getErrorCode()===J.ABORT;a(!1,new K(!1,null,m));return}const u=this.successCodes_.indexOf(c)!==-1;a(!0,new K(u,r))})},n=(a,i)=>{const r=this.resolve_,o=this.reject_,l=i.connection;if(i.wasSuccessCode)try{const c=this.callback_(l,l.getResponse());wn(c)?r(c):r()}catch(c){o(c)}else if(l!==null){const c=hn();c.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,c)):o(c)}else if(i.canceled){const c=this.appDelete_?rt():pn();o(c)}else{const c=mn();o(c)}};this.canceled_?n(!1,new K(!1,null,!0)):this.backoffId_=yn(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&vn(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class K{constructor(t,n,a){this.wasSuccessCode=t,this.connection=n,this.canceled=!!a}}function jn(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function An(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function En(e,t){t&&(e["X-Firebase-GMPID"]=t)}function kn(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function Rn(e,t,n,a,i,r,o=!0){const l=xn(e.urlParams),c=e.url+l,u=Object.assign({},e.headers);return En(u,t),jn(u,n),An(u,r),kn(u,a),new Tn(c,e.method,u,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,o)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nn(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function Cn(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X{constructor(t,n){this._service=t,n instanceof j?this._location=n:this._location=j.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new X(t,n)}get root(){const t=new j(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Cn(this._location.path)}get storage(){return this._service}get parent(){const t=Nn(this._location.path);if(t===null)return null;const n=new j(this._location.bucket,t);return new X(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw _n(t)}}function Ce(e,t){const n=t==null?void 0:t[ln];return n==null?null:j.makeFromBucketSpec(n,e)}function Pn(e,t,n,a={}){e.host=`${t}:${n}`,e._protocol="http";const{mockUserToken:i}=a;i&&(e._overrideAuthToken=typeof i=="string"?i:qt(i,e.app.options.projectId))}class On{constructor(t,n,a,i,r){this.app=t,this._authProvider=n,this._appCheckProvider=a,this._url=i,this._firebaseVersion=r,this._bucket=null,this._host=it,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=un,this._maxUploadRetryTime=dn,this._requests=new Set,i!=null?this._bucket=j.makeFromBucketSpec(i,this._host):this._bucket=Ce(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=j.makeFromBucketSpec(this._url,t):this._bucket=Ce(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){Ne("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){Ne("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new X(this,t)}_makeRequest(t,n,a,i,r=!0){if(this._deleted)return new bn(rt());{const o=Rn(t,this._appId,a,i,n,this._firebaseVersion,r);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(t,n){const[a,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,a,i).getPromise()}}const Pe="@firebase/storage",Oe="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot="storage";function Sn(e=We(),t){e=_e(e);const a=z(e,ot).getImmediate({identifier:t}),i=Ut("storage");return i&&Ln(a,...i),a}function Ln(e,t,n,a={}){Pn(e,t,n,a)}function Dn(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),a=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return new On(n,a,i,t,Ft)}function Mn(){B(new G(ot,Dn,"PUBLIC").setMultipleInstances(!0)),M(Pe,Oe,""),M(Pe,Oe,"esm2017")}Mn();const ct="@firebase/installations",ve="0.6.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lt=1e4,ut=`w:${ve}`,dt="FIS_v2",$n="https://firebaseinstallations.googleapis.com/v1",Fn=60*60*1e3,Un="installations",qn="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},P=new Ye(Un,qn,Vn);function ht(e){return e instanceof ge&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt({projectId:e}){return`${$n}/projects/${e}/installations`}function pt(e){return{token:e.token,requestStatus:2,expiresIn:Gn(e.expiresIn),creationTime:Date.now()}}async function ft(e,t){const a=(await t.json()).error;return P.create("request-failed",{requestName:e,serverCode:a.code,serverMessage:a.message,serverStatus:a.status})}function gt({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Bn(e,{refreshToken:t}){const n=gt(e);return n.append("Authorization",zn(t)),n}async function _t(e){const t=await e();return t.status>=500&&t.status<600?e():t}function Gn(e){return Number(e.replace("s","000"))}function zn(e){return`${dt} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hn({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const a=mt(e),i=gt(e),r=t.getImmediate({optional:!0});if(r){const u=await r.getHeartbeatsHeader();u&&i.append("x-firebase-client",u)}const o={fid:n,authVersion:dt,appId:e.appId,sdkVersion:ut},l={method:"POST",headers:i,body:JSON.stringify(o)},c=await _t(()=>fetch(a,l));if(c.ok){const u=await c.json();return{fid:u.fid||n,registrationStatus:2,refreshToken:u.refreshToken,authToken:pt(u.authToken)}}else throw await ft("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kn(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wn=/^[cdef][\w-]{21}$/,me="";function Yn(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=Jn(e);return Wn.test(n)?n:me}catch{return me}}function Jn(e){return Kn(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function te(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yt=new Map;function vt(e,t){const n=te(e);wt(n,t),Xn(n,t)}function wt(e,t){const n=yt.get(e);if(n)for(const a of n)a(t)}function Xn(e,t){const n=Qn();n&&n.postMessage({key:e,fid:t}),Zn()}let C=null;function Qn(){return!C&&"BroadcastChannel"in self&&(C=new BroadcastChannel("[Firebase] FID Change"),C.onmessage=e=>{wt(e.data.key,e.data.fid)}),C}function Zn(){yt.size===0&&C&&(C.close(),C=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea="firebase-installations-database",ta=1,O="firebase-installations-store";let ce=null;function we(){return ce||(ce=Vt(ea,ta,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(O)}}})),ce}async function Q(e,t){const n=te(e),i=(await we()).transaction(O,"readwrite"),r=i.objectStore(O),o=await r.get(n);return await r.put(t,n),await i.done,(!o||o.fid!==t.fid)&&vt(e,t.fid),t}async function xt(e){const t=te(e),a=(await we()).transaction(O,"readwrite");await a.objectStore(O).delete(t),await a.done}async function ne(e,t){const n=te(e),i=(await we()).transaction(O,"readwrite"),r=i.objectStore(O),o=await r.get(n),l=t(o);return l===void 0?await r.delete(n):await r.put(l,n),await i.done,l&&(!o||o.fid!==l.fid)&&vt(e,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xe(e){let t;const n=await ne(e.appConfig,a=>{const i=na(a),r=aa(e,i);return t=r.registrationPromise,r.installationEntry});return n.fid===me?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function na(e){const t=e||{fid:Yn(),registrationStatus:0};return It(t)}function aa(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(P.create("app-offline"));return{installationEntry:t,registrationPromise:i}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},a=sa(e,n);return{installationEntry:n,registrationPromise:a}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:ia(e)}:{installationEntry:t}}async function sa(e,t){try{const n=await Hn(e,t);return Q(e.appConfig,n)}catch(n){throw ht(n)&&n.customData.serverCode===409?await xt(e.appConfig):await Q(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function ia(e){let t=await Se(e.appConfig);for(;t.registrationStatus===1;)await bt(100),t=await Se(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:a}=await xe(e);return a||n}return t}function Se(e){return ne(e,t=>{if(!t)throw P.create("installation-not-found");return It(t)})}function It(e){return ra(e)?{fid:e.fid,registrationStatus:0}:e}function ra(e){return e.registrationStatus===1&&e.registrationTime+lt<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oa({appConfig:e,heartbeatServiceProvider:t},n){const a=ca(e,n),i=Bn(e,n),r=t.getImmediate({optional:!0});if(r){const u=await r.getHeartbeatsHeader();u&&i.append("x-firebase-client",u)}const o={installation:{sdkVersion:ut,appId:e.appId}},l={method:"POST",headers:i,body:JSON.stringify(o)},c=await _t(()=>fetch(a,l));if(c.ok){const u=await c.json();return pt(u)}else throw await ft("Generate Auth Token",c)}function ca(e,{fid:t}){return`${mt(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ie(e,t=!1){let n;const a=await ne(e.appConfig,r=>{if(!Tt(r))throw P.create("not-registered");const o=r.authToken;if(!t&&da(o))return r;if(o.requestStatus===1)return n=la(e,t),r;{if(!navigator.onLine)throw P.create("app-offline");const l=ma(r);return n=ua(e,l),l}});return n?await n:a.authToken}async function la(e,t){let n=await Le(e.appConfig);for(;n.authToken.requestStatus===1;)await bt(100),n=await Le(e.appConfig);const a=n.authToken;return a.requestStatus===0?Ie(e,t):a}function Le(e){return ne(e,t=>{if(!Tt(t))throw P.create("not-registered");const n=t.authToken;return pa(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function ua(e,t){try{const n=await oa(e,t),a=Object.assign(Object.assign({},t),{authToken:n});return await Q(e.appConfig,a),n}catch(n){if(ht(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await xt(e.appConfig);else{const a=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await Q(e.appConfig,a)}throw n}}function Tt(e){return e!==void 0&&e.registrationStatus===2}function da(e){return e.requestStatus===2&&!ha(e)}function ha(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Fn}function ma(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function pa(e){return e.requestStatus===1&&e.requestTime+lt<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fa(e){const t=e,{installationEntry:n,registrationPromise:a}=await xe(t);return a?a.catch(console.error):Ie(t).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ga(e,t=!1){const n=e;return await _a(n),(await Ie(n,t)).token}async function _a(e){const{registrationPromise:t}=await xe(e);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ba(e){if(!e||!e.options)throw le("App Configuration");if(!e.name)throw le("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw le(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function le(e){return P.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt="installations",ya="installations-internal",va=e=>{const t=e.getProvider("app").getImmediate(),n=ba(t),a=z(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:a,_delete:()=>Promise.resolve()}},wa=e=>{const t=e.getProvider("app").getImmediate(),n=z(t,jt).getImmediate();return{getId:()=>fa(n),getToken:i=>ga(n,i)}};function xa(){B(new G(jt,va,"PUBLIC")),B(new G(ya,wa,"PRIVATE"))}xa();M(ct,ve);M(ct,ve,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z="analytics",Ia="firebase_id",Ta="origin",ja=60*1e3,Aa="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Te="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x=new Bt("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},I=new Ye("analytics","Analytics",Ea);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ka(e){if(!e.startsWith(Te)){const t=I.create("invalid-gtag-resource",{gtagURL:e});return x.warn(t.message),""}return e}function At(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function Ra(e,t){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(e,t)),n}function Na(e,t){const n=Ra("firebase-js-sdk-policy",{createScriptURL:ka}),a=document.createElement("script"),i=`${Te}?l=${e}&id=${t}`;a.src=n?n==null?void 0:n.createScriptURL(i):i,a.async=!0,document.head.appendChild(a)}function Ca(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function Pa(e,t,n,a,i,r){const o=a[i];try{if(o)await t[o];else{const c=(await At(n)).find(u=>u.measurementId===i);c&&await t[c.appId]}}catch(l){x.error(l)}e("config",i,r)}async function Oa(e,t,n,a,i){try{let r=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const l=await At(n);for(const c of o){const u=l.find(f=>f.measurementId===c),m=u&&t[u.appId];if(m)r.push(m);else{r=[];break}}}r.length===0&&(r=Object.values(t)),await Promise.all(r),e("event",a,i||{})}catch(r){x.error(r)}}function Sa(e,t,n,a){async function i(r,...o){try{if(r==="event"){const[l,c]=o;await Oa(e,t,n,l,c)}else if(r==="config"){const[l,c]=o;await Pa(e,t,n,a,l,c)}else if(r==="consent"){const[l,c]=o;e("consent",l,c)}else if(r==="get"){const[l,c,u]=o;e("get",l,c,u)}else if(r==="set"){const[l]=o;e("set",l)}else e(r,...o)}catch(l){x.error(l)}}return i}function La(e,t,n,a,i){let r=function(...o){window[a].push(arguments)};return window[i]&&typeof window[i]=="function"&&(r=window[i]),window[i]=Sa(r,e,t,n),{gtagCore:r,wrappedGtag:window[i]}}function Da(e){const t=window.document.getElementsByTagName("script");for(const n of Object.values(t))if(n.src&&n.src.includes(Te)&&n.src.includes(e))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ma=30,$a=1e3;class Fa{constructor(t={},n=$a){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const Et=new Fa;function Ua(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function qa(e){var t;const{appId:n,apiKey:a}=e,i={method:"GET",headers:Ua(a)},r=Aa.replace("{app-id}",n),o=await fetch(r,i);if(o.status!==200&&o.status!==304){let l="";try{const c=await o.json();!((t=c.error)===null||t===void 0)&&t.message&&(l=c.error.message)}catch{}throw I.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()}async function Va(e,t=Et,n){const{appId:a,apiKey:i,measurementId:r}=e.options;if(!a)throw I.create("no-app-id");if(!i){if(r)return{measurementId:r,appId:a};throw I.create("no-api-key")}const o=t.getThrottleMetadata(a)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new za;return setTimeout(async()=>{l.abort()},ja),kt({appId:a,apiKey:i,measurementId:r},o,l,t)}async function kt(e,{throttleEndTimeMillis:t,backoffCount:n},a,i=Et){var r;const{appId:o,measurementId:l}=e;try{await Ba(a,t)}catch(c){if(l)return x.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:o,measurementId:l};throw c}try{const c=await qa(e);return i.deleteThrottleMetadata(o),c}catch(c){const u=c;if(!Ga(u)){if(i.deleteThrottleMetadata(o),l)return x.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${l} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:o,measurementId:l};throw c}const m=Number((r=u==null?void 0:u.customData)===null||r===void 0?void 0:r.httpStatus)===503?Ae(n,i.intervalMillis,Ma):Ae(n,i.intervalMillis),f={throttleEndTimeMillis:Date.now()+m,backoffCount:n+1};return i.setThrottleMetadata(o,f),x.debug(`Calling attemptFetch again in ${m} millis`),kt(e,f,a,i)}}function Ba(e,t){return new Promise((n,a)=>{const i=Math.max(t-Date.now(),0),r=setTimeout(n,i);e.addEventListener(()=>{clearTimeout(r),a(I.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function Ga(e){if(!(e instanceof ge)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class za{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function Ha(e,t,n,a,i){if(i&&i.global){e("event",n,a);return}else{const r=await t,o=Object.assign(Object.assign({},a),{send_to:r});e("event",n,o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ka(){if(Xe())try{await Qe()}catch(e){return x.warn(I.create("indexeddb-unavailable",{errorInfo:e==null?void 0:e.toString()}).message),!1}else return x.warn(I.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function Wa(e,t,n,a,i,r,o){var l;const c=Va(e);c.then(h=>{n[h.measurementId]=h.appId,e.options.measurementId&&h.measurementId!==e.options.measurementId&&x.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${h.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(h=>x.error(h)),t.push(c);const u=Ka().then(h=>{if(h)return a.getId()}),[m,f]=await Promise.all([c,u]);Da(r)||Na(r,m.measurementId),i("js",new Date);const g=(l=o==null?void 0:o.config)!==null&&l!==void 0?l:{};return g[Ta]="firebase",g.update=!0,f!=null&&(g[Ia]=f),i("config",m.measurementId,g),m.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ya{constructor(t){this.app=t}_delete(){return delete q[this.app.options.appId],Promise.resolve()}}let q={},De=[];const Me={};let ue="dataLayer",Ja="gtag",$e,Rt,Fe=!1;function Xa(){const e=[];if(Je()&&e.push("This is a browser extension environment."),Ze()||e.push("Cookies are not available."),e.length>0){const t=e.map((a,i)=>`(${i+1}) ${a}`).join(" "),n=I.create("invalid-analytics-context",{errorInfo:t});x.warn(n.message)}}function Qa(e,t,n){Xa();const a=e.options.appId;if(!a)throw I.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)x.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw I.create("no-api-key");if(q[a]!=null)throw I.create("already-exists",{id:a});if(!Fe){Ca(ue);const{wrappedGtag:r,gtagCore:o}=La(q,De,Me,ue,Ja);Rt=r,$e=o,Fe=!0}return q[a]=Wa(e,De,Me,t,$e,ue,n),new Ya(e)}function Za(e=We()){e=_e(e);const t=z(e,Z);return t.isInitialized()?t.getImmediate():es(e)}function es(e,t={}){const n=z(e,Z);if(n.isInitialized()){const i=n.getImmediate();if(Gt(t,n.getOptions()))return i;throw I.create("already-initialized")}return n.initialize({options:t})}async function ts(){if(Je()||!Ze()||!Xe())return!1;try{return await Qe()}catch{return!1}}function ns(e,t,n,a){e=_e(e),Ha(Rt,q[e.app.options.appId],t,n,a).catch(i=>x.error(i))}const Ue="@firebase/analytics",qe="0.10.8";function as(){B(new G(Z,(t,{options:n})=>{const a=t.getProvider("app").getImmediate(),i=t.getProvider("installations-internal").getImmediate();return Qa(a,i,n)},"PUBLIC")),B(new G("analytics-internal",e,"PRIVATE")),M(Ue,qe),M(Ue,qe,"esm2017");function e(t){try{const n=t.getProvider(Z).getImmediate();return{logEvent:(a,i,r)=>ns(n,a,i,r)}}catch(n){throw I.create("interop-component-reg-failed",{reason:n})}}}as();const ss={apiKey:"AIzaSyBSpZjF_43y3zlTohzGl460uYbZzqpNwIs",authDomain:"calvaryprema-9ed2d.firebaseapp.com",projectId:"calvaryprema-9ed2d",storageBucket:"calvaryprema-9ed2d.firebasestorage.app",messagingSenderId:"72077173332",appId:"1:72077173332:web:02a836a5c8e3034d9883c1",measurementId:"G-5XBGBPQ6Q9"},ae=zt(ss),N=Ht(ae),S=Kt(ae);Sn(ae);ts().then(e=>e?Za(ae):null);const Nt=d.createContext(null);function is({children:e}){const[t,n]=d.useState(null),[a,i]=d.useState(null),[r,o]=d.useState(!0),[l,c]=d.useState(null);d.useEffect(()=>{const f=Wt(N,async g=>{if(!g){n(null),i(null),o(!1);return}try{console.log("Logged User UID:",g.uid);const h=$(S,"admins",g.uid),_=await Y(h);if(console.log("Admin Exists:",_.exists()),!_.exists()){await U(N),n(null),i(null),c("You do not have admin access.");return}const b=_.data();if(console.log("Admin Data:",b),b.role!=="admin"){await U(N),n(null),i(null),c("You are not admin.");return}n(g),i(b),await be(h,{lastLogin:ye()})}catch(h){console.error("Auth Error:",h),n(null),i(null),c(h.message)}finally{o(!1)}});return()=>f()},[]);async function u(f,g){c(null);try{const _=(await Yt(N,f,g)).user;console.log("Login UID:",_.uid);const b=$(S,"admins",_.uid),p=await Y(b);if(console.log("Admin Document Exists:",p.exists()),!p.exists())throw await U(N),new Error("You do not have admin access.");const w=p.data();if(console.log("Admin Data:",w),w.role!=="admin")throw await U(N),new Error("You are not admin.");return n(_),i(w),_}catch(h){console.error(h);let _=h.message;throw h.code==="auth/invalid-credential"&&(_="Invalid email or password."),c(_),new Error(_)}}async function m(){await U(N),n(null),i(null)}return s.jsx(Nt.Provider,{value:{user:t,adminData:a,loading:r,error:l,login:u,logout:m,isAdmin:!!a},children:e})}function rs(){return d.useContext(Nt)}const Ct=d.createContext(null),os=["homePage","aboutPage","tribalPage","childrensPage","contactPage","globalSettings"],Ve="calvary_prema_content_cache",cs=30*60*1e3;function ls({children:e}){const[t,n]=d.useState(()=>{try{const c=JSON.parse(localStorage.getItem(Ve)||"null");return c&&Date.now()-c.time<cs?c.content:{}}catch{return{}}}),[a,i]=d.useState([]),[r,o]=d.useState(!0);d.useEffect(()=>{const c=os.map(u=>et($(S,"siteContent",u),m=>{n(f=>{const g={...f,[u]:m.exists()?m.data():null};return localStorage.setItem(Ve,JSON.stringify({time:Date.now(),content:g})),g})},m=>console.warn(`Content fetch error for ${u}:`,m)));return l().finally(()=>o(!1)),()=>c.forEach(u=>u())},[]);async function l(){try{const c=Jt(Xt(S,"gallery"),Qt("order","asc")),u=await Zt(c);i(u.docs.map(m=>({id:m.id,...m.data()})))}catch(c){console.warn("Gallery fetch error:",c)}}return s.jsx(Ct.Provider,{value:{homePage:t.homePage,aboutPage:t.aboutPage,tribalPage:t.tribalPage,childrensPage:t.childrensPage,contactPage:t.contactPage,globalSettings:t.globalSettings,gallery:a,loading:r,refreshGallery:l},children:e})}const je=()=>d.useContext(Ct),Pt=d.createContext(null),L={ENGLISH:"en",TELUGU:"te"},Be="calvary_prema_lang",Ge={nav_home:{en:"Home",te:"హోమ్"},nav_about:{en:"About Us",te:"మా గురించి"},nav_ministries:{en:"Ministries",te:"పరిచర్యలు"},nav_tribal:{en:"Tribal Outreach",te:"గిరిజన సేవ"},nav_children:{en:"Children's Ministry",te:"పిల్లల పరిచర్య"},nav_gallery:{en:"Gallery",te:"గ్యాలరీ"},nav_contact:{en:"Contact",te:"సంప్రదించండి"},hero_cta:{en:"Learn More",te:"మరింత తెలుసుకోండి"},read_more:{en:"Read More",te:"మరింత చదవండి"},view_gallery:{en:"View Gallery",te:"గ్యాలరీ చూడండి"},contact_us:{en:"Contact Us",te:"మమ్మల్ని సంప్రదించండి"},mission_label:{en:"Our Mission",te:"మా లక్ష్యం"},vision_label:{en:"Our Vision",te:"మా దృష్టి"},about_label:{en:"About Us",te:"మా గురించి"},ministries_label:{en:"Our Ministries",te:"మా పరిచర్యలు"},tribal_label:{en:"Tribal Outreach",te:"గిరిజన సేవ"},children_label:{en:"Children's Ministry",te:"పిల్లల పరిచర్య"},gallery_label:{en:"Gallery",te:"గ్యాలరీ"},contact_label:{en:"Get In Touch",te:"సంప్రదించండి"},footer_rights:{en:"All rights reserved.",te:"అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి."},footer_ministry:{en:"Calvary Prema Ministries",te:"కల్వరి ప్రేమ పరిచర్యలు"},address_label:{en:"Address",te:"చిరునామా"},phone_label:{en:"Phone",te:"ఫోన్"},send_message:{en:"Send Message",te:"సందేశం పంపండి"},name_placeholder:{en:"Your Name",te:"మీ పేరు"},email_placeholder:{en:"Your Email",te:"మీ ఇమెయిల్"},message_placeholder:{en:"Your Message",te:"మీ సందేశం"},chatbot_greeting:{en:"Hi! How can I help you today?",te:"నమస్కారం! నేను మీకు ఏమి సహాయం చేయగలను?"},chatbot_placeholder:{en:"Ask me anything...",te:"ఏదైనా అడగండి..."},chatbot_send:{en:"Send",te:"పంపు"},loading:{en:"Loading...",te:"లోడ్ అవుతోంది..."},close:{en:"Close",te:"మూసివేయి"},banner_close:{en:"Continue to Website",te:"వెబ్‌సైట్‌కు కొనసాగండి"},tribal_impact_1:{en:"Villages Reached",te:"చేరిన గ్రామాలు"},tribal_impact_2:{en:"Families Blessed",te:"ఆశీర్వదించిన కుటుంబాలు"},tribal_impact_3:{en:"Years of Service",te:"సేవా సంవత్సరాలు"},children_impact_1:{en:"Children Served",te:"సేవించిన పిల్లలు"},children_impact_2:{en:"Schools Visited",te:"సందర్శించిన పాఠశాలలు"},children_impact_3:{en:"Communities Reached",te:"చేరిన సమాజాలు"},verse_mark:{en:"Mark 16:16-17",te:"మార్కు 16:16-17"},verse_psalm:{en:"Psalms 28:7",te:"కీర్తన 28:7"}};function us({children:e}){const[t,n]=d.useState(()=>localStorage.getItem(Be)||L.ENGLISH),a=d.useCallback(l=>{localStorage.setItem(Be,l),n(l)},[]),i=d.useCallback(()=>{a(t===L.ENGLISH?L.TELUGU:L.ENGLISH)},[t,a]),r=d.useCallback((l,c)=>l&&(l[`${c}_${t}`]||l[`${c}_en`]||l[c])||"",[t]),o=d.useCallback(l=>{var c,u;return((c=Ge[l])==null?void 0:c[t])||((u=Ge[l])==null?void 0:u.en)||l},[t]);return s.jsx(Pt.Provider,{value:{language:t,setLanguage:a,toggleLanguage:i,t:r,ts:o,isTelugu:t===L.TELUGU,isEnglish:t===L.ENGLISH},children:e})}function F(){const e=d.useContext(Pt);if(!e)throw new Error("useLanguage must be used within LanguageProvider");return e}function pe({src:e="/logo.svg",size:t=48,pulse:n=!0,className:a=""}){const[i,r]=d.useState(!1),[o,l]=d.useState(!1),c=e==="/logo.png"?"/logo.svg":e;return s.jsxs("div",{className:`anim-logo ${n&&i?"anim-logo--pulse":""} ${a}`,style:{width:t,height:t},children:[!i&&!o&&s.jsx("div",{className:"anim-logo__shimmer",style:{width:t,height:t}}),n&&i&&s.jsx("div",{className:"anim-logo__glow-ring",style:{width:t+16,height:t+16}}),o?s.jsx("div",{className:"anim-logo__fallback",style:{width:t,height:t,fontSize:t*.55},children:"+"}):s.jsx("img",{src:c,alt:"Calvary Prema Ministries Logo",className:`anim-logo__img ${i?"anim-logo__img--loaded":""}`,style:{width:t,height:t},onLoad:()=>r(!0),onError:()=>{l(!0),r(!0)}})]})}function ds(){const{toggleLanguage:e,isTelugu:t}=F();return s.jsxs("button",{className:"lang-switch",onClick:e,role:"switch","aria-checked":t,"aria-label":"Toggle language between Telugu and English",children:[s.jsx("span",{className:`lang-label ${t?"":"active"}`,children:"EN"}),s.jsx("span",{className:`lang-track ${t?"te":"en"}`,children:s.jsx("span",{className:"lang-thumb"})}),s.jsx("span",{className:`lang-label ${t?"active":""}`,children:"తె"})]})}const hs=[{path:"/",labelKey:"nav_home",icon:"⌂"},{path:"/about",labelKey:"nav_about",icon:"✚"},{path:"/tribal-outreach",labelKey:"nav_tribal",icon:"◇"},{path:"/gallery",labelKey:"nav_gallery",icon:"▧"},{path:"/contact",labelKey:"nav_contact",icon:"☎"}];function ms(){const{ts:e}=F();return s.jsx("nav",{className:"mobile-bottom-nav",role:"navigation","aria-label":"Bottom Navigation",children:hs.map(t=>s.jsxs(V,{to:t.path,className:({isActive:n})=>`mobile-bottom-tab ${n?"active":""}`,"aria-label":e(t.labelKey),children:[s.jsx("span",{className:"mobile-bottom-tab__icon","aria-hidden":"true",children:t.icon}),s.jsx("span",{className:"mobile-bottom-tab__label",children:e(t.labelKey)})]},t.path))})}function ps({isOpen:e,onClose:t,navLinks:n}){const{ts:a}=F();return s.jsxs(s.Fragment,{children:[s.jsx("div",{className:`mobile-nav-overlay ${e?"open":""}`,onClick:t,"aria-hidden":"true"}),s.jsxs("aside",{className:`mobile-nav-drawer ${e?"open":""}`,role:"dialog","aria-modal":"true","aria-label":"Mobile Navigation",children:[s.jsxs("div",{className:"mobile-nav-header",children:[s.jsx("span",{className:"mobile-nav-title",children:a("footer_ministry")}),s.jsx("button",{className:"mobile-nav-close",onClick:t,"aria-label":"Close menu",children:"×"})]}),s.jsx("ul",{className:"mobile-nav-links",children:n.map((i,r)=>i.dropdown?s.jsxs(Ke.Fragment,{children:[s.jsx("li",{className:"mobile-nav-category",children:i.label}),i.dropdown.map(o=>s.jsx("li",{children:s.jsx(V,{to:o.path,className:"mobile-nav-link mobile-nav-link--sub",onClick:t,children:o.label})},o.path))]},r):s.jsx("li",{children:s.jsx(V,{to:i.path,className:({isActive:o})=>`mobile-nav-link ${o?"active":""}`,onClick:t,children:i.label})},i.path))}),s.jsx("div",{className:"mobile-nav-footer",children:s.jsx("a",{href:"tel:+918179305085",className:"mobile-nav-phone",children:"☎ 81793 05085"})})]})]})}function fs(){const[e,t]=d.useState(!1),[n,a]=d.useState(0),[i,r]=d.useState(!1),[o,l]=d.useState(!1),{ts:c}=F(),{globalSettings:u}=je(),m=fe(),f=d.useRef(null);d.useEffect(()=>{const h=()=>{t(window.scrollY>60);const _=document.documentElement.scrollHeight-window.innerHeight;a(_>0?Math.min(100,window.scrollY/_*100):0)};return h(),window.addEventListener("scroll",h,{passive:!0}),()=>window.removeEventListener("scroll",h)},[]),d.useEffect(()=>{r(!1),l(!1)},[m]),d.useEffect(()=>{const h=_=>{f.current&&!f.current.contains(_.target)&&l(!1)};return document.addEventListener("mousedown",h),()=>document.removeEventListener("mousedown",h)},[]);const g=[{path:"/",label:c("nav_home")},{path:"/about",label:c("nav_about")},{label:c("nav_ministries"),dropdown:[{path:"/tribal-outreach",label:c("nav_tribal")},{path:"/childrens-ministry",label:c("nav_children")}]},{path:"/gallery",label:c("nav_gallery")},{path:"/contact",label:c("nav_contact")}];return s.jsxs(s.Fragment,{children:[s.jsxs("nav",{className:`navbar ${e?"navbar--scrolled":"navbar--transparent"}`,role:"navigation","aria-label":"Main Navigation",children:[s.jsx("div",{className:"navbar__progress",style:{width:`${n}%`}}),s.jsxs("div",{className:"navbar__container",children:[s.jsxs(D,{to:"/",className:"navbar__logo","aria-label":"Calvary Prema - Home",children:[s.jsx(pe,{src:(u==null?void 0:u.logoURL)||"/logo.svg",size:52,pulse:!e}),s.jsx("span",{className:"navbar__logo-name",children:c("footer_ministry")})]}),s.jsx("ul",{className:"navbar__links",role:"list",children:g.map((h,_)=>h.dropdown?s.jsxs("li",{className:"navbar__item navbar__item--dropdown",ref:f,children:[s.jsxs("button",{className:`navbar__link navbar__dropdown-trigger ${h.dropdown.some(b=>m.pathname===b.path)?"active":""}`,onClick:()=>l(b=>!b),"aria-haspopup":"true","aria-expanded":o,children:[h.label,s.jsx("span",{className:`navbar__caret ${o?"open":""}`,children:"▾"})]}),s.jsx("ul",{className:`navbar__dropdown ${o?"navbar__dropdown--open":""}`,role:"menu",children:h.dropdown.map(b=>s.jsx("li",{role:"menuitem",children:s.jsx(V,{to:b.path,className:"navbar__dropdown-link",children:b.label})},b.path))})]},_):s.jsx("li",{className:"navbar__item",children:s.jsx(V,{to:h.path,className:({isActive:b})=>`navbar__link ${b?"active":""}`,children:h.label})},h.path))}),s.jsxs("div",{className:"navbar__controls",children:[s.jsx("a",{className:"navbar__quick-call",href:"tel:+918179305085",children:"Call"}),s.jsx(ds,{}),s.jsxs("button",{className:"navbar__hamburger",onClick:()=>r(h=>!h),"aria-label":i?"Close menu":"Open menu","aria-expanded":i,children:[s.jsx("span",{className:`hamburger-line ${i?"open":""}`}),s.jsx("span",{className:`hamburger-line ${i?"open":""}`}),s.jsx("span",{className:`hamburger-line ${i?"open":""}`})]})]})]})]}),s.jsx(ps,{isOpen:i,onClose:()=>r(!1),navLinks:g})]})}function gs(){const{ts:e}=F(),{globalSettings:t}=je(),n=new Date().getFullYear(),a=(t==null?void 0:t.socialLinks)||{};return s.jsxs("footer",{className:"footer",children:[s.jsx("div",{className:"footer__wave",children:s.jsx("svg",{viewBox:"0 0 1440 60",preserveAspectRatio:"none",children:s.jsx("path",{d:"M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z",fill:"var(--color-off-white)"})})}),s.jsx("div",{className:"footer__main",children:s.jsxs("div",{className:"footer__container",children:[s.jsxs("div",{className:"footer__brand",children:[s.jsx("img",{src:(t==null?void 0:t.logoURL)||"/logo.svg",alt:"Calvary Prema",width:"64",height:"64"}),s.jsx("h3",{children:e("footer_ministry")}),s.jsx("p",{children:(t==null?void 0:t.footerText_en)||`${e("mission_label")}: Loving God • Loving People`}),s.jsx("p",{className:"footer__verse",children:'"The Lord is my strength and my shield." - Psalms 28:7'})]}),s.jsxs("div",{className:"footer__nav",children:[s.jsx("h4",{children:"Ministry"}),s.jsxs("ul",{children:[s.jsx("li",{children:s.jsx(D,{to:"/about",children:"About Us"})}),s.jsx("li",{children:s.jsx(D,{to:"/tribal-outreach",children:"Tribal Outreach"})}),s.jsx("li",{children:s.jsx(D,{to:"/childrens-ministry",children:"Children's Ministry"})}),s.jsx("li",{children:s.jsx(D,{to:"/gallery",children:"Gallery"})}),s.jsx("li",{children:s.jsx(D,{to:"/contact",children:"Contact"})})]})]}),s.jsxs("div",{className:"footer__contact",children:[s.jsx("h4",{children:e("contact_label")}),s.jsxs("address",{children:[s.jsxs("p",{children:["Telugu Baptist Church",s.jsx("br",{}),"Gogulapadu Village,",s.jsx("br",{}),"Rompicherla Mandal,",s.jsx("br",{}),"Palnadu Dist., A.P. 522617"]}),s.jsx("p",{children:s.jsx("a",{href:"tel:+918179305085",className:"footer__phone",children:"☎ 81793 05085"})})]}),s.jsxs("div",{className:"footer__social",children:[a.whatsapp&&s.jsx("a",{href:`https://wa.me/${a.whatsapp}`,target:"_blank",rel:"noopener noreferrer","aria-label":"WhatsApp",children:"WA"}),a.facebook&&s.jsx("a",{href:a.facebook,target:"_blank",rel:"noopener noreferrer","aria-label":"Facebook",children:"FB"}),a.youtube&&s.jsx("a",{href:a.youtube,target:"_blank",rel:"noopener noreferrer","aria-label":"YouTube",children:"YT"})]})]})]})}),s.jsxs("div",{className:"footer__bottom",children:[s.jsxs("span",{children:["© ",n," ",e("footer_ministry"),". ",e("footer_rights")]}),s.jsx("span",{children:"✚"})]})]})}const ze=[{id:"about_ministry",keywords:["about","who","ministry","calvary","prema","what is"],question_en:"What is Calvary Prema Ministries?",question_te:"కల్వరి ప్రేమ పరిచర్యలు అంటే ఏమిటి?",answer_en:"Calvary Prema Ministries is a Christian ministry based in Andhra Pradesh, India. The ministry journey began in 2000 through Ravi Children & Tribal Ministry and continues today through tribal outreach, children's ministry, prayer, worship, and compassionate community service.",answer_te:"కల్వరి ప్రేమ పరిచర్యలు ఆంధ్రప్రదేశ్‌లో ఉన్న క్రైస్తవ పరిచర్య. 2000లో రవి చిల్డ్రన్ & ట్రైబల్ మినిస్ట్రీ ద్వారా ప్రారంభమైన ఈ సేవ నేడు గిరిజన సేవ, పిల్లల పరిచర్య, ప్రార్థన, ఆరాధన మరియు సమాజ సేవగా కొనసాగుతోంది.",category:"about"},{id:"founder",keywords:["founder","pastor","leader","who started","history","father","ravi"],question_en:"Who started this ministry?",question_te:"ఈ పరిచర్యను ఎవరు ప్రారంభించారు?",answer_en:"The ministry began through the founder's father in 2000 as Ravi Children & Tribal Ministry. After he passed away during COVID in 2020, the current leader continued the work with renewed purpose and faith.",answer_te:"ఈ పరిచర్య 2000లో స్థాపకుని తండ్రి ద్వారా రవి చిల్డ్రన్ & ట్రైబల్ మినిస్ట్రీగా ప్రారంభమైంది. 2020లో కోవిడ్ సమయంలో ఆయన మరణించిన తరువాత ప్రస్తుత నాయకుడు విశ్వాసంతో ఈ సేవను కొనసాగిస్తున్నారు.",category:"about"},{id:"location",keywords:["address","location","where","village","district","andhra","palnadu","gogulapadu"],question_en:"Where is Calvary Prema Ministries located?",question_te:"కల్వరి ప్రేమ పరిచర్యలు ఎక్కడ ఉంది?",answer_en:"We are located at Telugu Baptist Church, Gogulapadu Village, Rompicherla Mandal, Palnadu District, Andhra Pradesh - PIN 522617.",answer_te:"మేము తెలుగు బాప్టిస్ట్ చర్చి, గొగులపాడు గ్రామం, రొంపిచెర్ల మండలం, పల్నాడు జిల్లా, ఆంధ్రప్రదేశ్ - పిన్ 522617 వద్ద ఉన్నాం.",category:"contact"},{id:"contact",keywords:["contact","phone","call","reach","number","mobile","tel"],question_en:"How can I contact Calvary Prema Ministries?",question_te:"కల్వరి ప్రేమ పరిచర్యలను ఎలా సంప్రదించాలి?",answer_en:"You can contact us by phone at 81793 05085 or use the Contact form on this website.",answer_te:"మీరు 81793 05085 నంబర్‌కు ఫోన్ చేయవచ్చు లేదా ఈ వెబ్‌సైట్‌లోని సంప్రదింపు ఫారమ్‌ను ఉపయోగించవచ్చు.",category:"contact"},{id:"tribal_outreach",keywords:["tribal","outreach","village","community","adivasi","girijanam"],question_en:"What is the Tribal Outreach Ministry?",question_te:"గిరిజన సేవ పరిచర్య అంటే ఏమిటి?",answer_en:"Our Tribal Outreach Ministry serves remote tribal villages in Andhra Pradesh with spiritual encouragement, prayer, practical support, and the message of hope in Christ.",answer_te:"మా గిరిజన సేవ పరిచర్య ఆంధ్రప్రదేశ్‌లోని మారుమూల గిరిజన గ్రామాలకు ఆధ్యాత్మిక ప్రోత్సాహం, ప్రార్థన, ఆచరణాత్మక సహాయం మరియు క్రీస్తులో ఆశను అందిస్తుంది.",category:"ministries"},{id:"children_ministry",keywords:["children","kids","child","youth","sunday school","pilla"],question_en:"What does the Children's Ministry do?",question_te:"పిల్లల పరిచర్య ఏమి చేస్తుంది?",answer_en:"Our Children's Ministry nurtures young hearts with God's word, prayer, encouragement, and positive community care for children and youth.",answer_te:"మా పిల్లల పరిచర్య దేవుని వాక్యము, ప్రార్థన, ప్రోత్సాహం మరియు ప్రేమతో పిల్లలు మరియు యువతను పెంపొందిస్తుంది.",category:"ministries"},{id:"mission",keywords:["mission","vision","goal","purpose","aim","lakshyam"],question_en:"What is the mission of Calvary Prema?",question_te:"కల్వరి ప్రేమ లక్ష్యం ఏమిటి?",answer_en:"Our mission is to share the love of Christ through church ministry, tribal outreach, children's ministry, prayer, and compassionate service.",answer_te:"మా లక్ష్యం చర్చి పరిచర్య, గిరిజన సేవ, పిల్లల పరిచర్య, ప్రార్థన మరియు ప్రేమతో కూడిన సేవ ద్వారా క్రీస్తు ప్రేమను పంచడం.",category:"about"},{id:"gallery",keywords:["gallery","photos","pictures","images","fotulu"],question_en:"Where can I see photos of your ministry?",question_te:"మీ పరిచర్య ఫోటోలు ఎక్కడ చూడవచ్చు?",answer_en:"You can view ministry photos in the Gallery section, including tribal outreach, children's ministry, church services, and events.",answer_te:"మీరు గ్యాలరీ విభాగంలో గిరిజన సేవ, పిల్లల పరిచర్య, చర్చి సేవలు మరియు కార్యక్రమాల ఫోటోలు చూడవచ్చు.",category:"gallery"},{id:"verse_mark",keywords:["mark","verse","scripture","bible","baptized","saved","signs"],question_en:"What is Mark 16:16-17?",question_te:"మార్కు 16:16-17 ఏమిటి?",answer_en:"Mark 16:16-17 says that whoever believes and is baptized will be saved, and signs will accompany those who believe.",answer_te:"మార్కు 16:16-17 విశ్వసించి బాప్తిస్మము పొందినవాడు రక్షింపబడును అని చెబుతుంది.",category:"scripture"},{id:"verse_psalm",keywords:["psalm","psalms","strength","shield","trusted"],question_en:"What is Psalms 28:7?",question_te:"కీర్తన 28:7 ఏమిటి?",answer_en:"Psalms 28:7 says: The Lord is my strength and my shield; my heart trusted in Him, and I am helped.",answer_te:"కీర్తన 28:7: యెహోవా నా బలమును నా డాలుమై యున్నాడు; నా హృదయము ఆయనయందు నమ్మిక యుంచగా నేను సహాయము పొందితిని.",category:"scripture"},{id:"help",keywords:["help","hello","hi","hey","namaste","namaskar","good morning","good evening"],question_en:"Hello! How can I help?",question_te:"నమస్కారం!",answer_en:"Welcome to Calvary Prema Ministries. I can help with information about our ministry, tribal outreach, children's ministry, location, contact details, and mission.",answer_te:"కల్వరి ప్రేమ పరిచర్యలకు స్వాగతం. మా పరిచర్య, గిరిజన సేవ, పిల్లల పరిచర్య, స్థానం, సంప్రదింపు వివరాలు మరియు లక్ష్యం గురించి నేను సహాయం చేయగలను.",category:"general"}];class _s{constructor(){this.knowledge=[...ze],this.language="en",this.unsubscribe=null}async init(){try{const t=$(S,"chatbotKnowledge","knowledgeBase");this.unsubscribe=et(t,n=>{if(!n.exists())return;const a=n.data().entries;if(!Array.isArray(a)||a.length===0)return;const i=Object.fromEntries(ze.map(r=>[r.id,r]));a.forEach(r=>{r.id&&(i[r.id]=r)}),this.knowledge=Object.values(i)})}catch(t){console.warn("Chatbot: Could not load Firestore knowledge.",t)}}setLanguage(t){this.language=t}findBestMatch(t){const n=t.toLowerCase().trim();if(!n)return null;const a=this.tokenize(n);let i=0,r=null;for(const o of this.knowledge){const l=this.scoreEntry(a,n,o);l>i&&(i=l,r=o)}return i>=.2?{entry:r,confidence:i}:null}scoreEntry(t,n,a){let i=0;for(const u of a.keywords||[]){const m=u.toLowerCase();n.includes(m)&&(i+=.4),t.some(f=>ys(f,m))&&(i+=.2)}const r=(a[`question_${this.language}`]||a.question_en||"").toLowerCase(),o=this.tokenize(r),l=t.filter(u=>o.includes(u)).length;o.length&&(i+=l/o.length*.3);const c={contact:["contact","call","phone","reach"],about:["about","who","what is","ministry"],ministries:["tribal","children","ministry","serve"],gallery:["photo","picture","gallery","image"],scripture:["verse","bible","scripture","psalm","mark"]};for(const[u,m]of Object.entries(c))a.category===u&&m.some(f=>n.includes(f))&&(i+=.1);return Math.min(i,1)}tokenize(t){return t.toLowerCase().replace(/[^\w\s]/g," ").split(/\s+/).filter(n=>n.length>2&&!bs.includes(n))}respond(t){const n=this.language;if(!(t!=null&&t.trim()))return{text:n==="te"?"దయచేసి మీ ప్రశ్న టైప్ చేయండి.":"Please type your question.",confidence:0};const a=this.findBestMatch(t);return a?{text:a.entry[`answer_${n}`]||a.entry.answer_en,confidence:a.confidence,category:a.entry.category}:{text:n==="te"?"క్షమించండి, నాకు ఆ సమాచారం లేదు. దయచేసి 81793 05085 కు సంప్రదించండి.":"I'm sorry, I don't have information about that. Please contact us at 81793 05085 or use the Contact page.",confidence:0,fallback:!0}}destroy(){this.unsubscribe&&this.unsubscribe()}}const bs=["the","is","in","a","an","and","or","for","to","of","at","on","it","do","can","me","you","my","your"];function ys(e,t){return e===t||t.startsWith(e.slice(0,4))?!0:e.length>=5&&vs(e,t)<=2}function vs(e,t){const n=Array.from({length:e.length+1},(a,i)=>Array.from({length:t.length+1},(r,o)=>i===0?o:o===0?i:0));for(let a=1;a<=e.length;a++)for(let i=1;i<=t.length;i++)n[a][i]=e[a-1]===t[i-1]?n[a-1][i-1]:1+Math.min(n[a-1][i-1],n[a-1][i],n[a][i-1]);return n[e.length][t.length]}function Ot(){return new Date().toISOString().split("T")[0]}async function Ks(e){const t=Ot(),n=$(S,"analytics",t);try{(await Y(n)).exists()?await be(n,{[`pageViews.${e}`]:nt(1)}):await tt(n,{date:ye(),pageViews:{[e]:1},uniqueVisitors:1,chatbotQueries:0})}catch(a){console.warn("Analytics tracking error:",a)}}async function ws(){const e=Ot(),t=$(S,"analytics",e);try{(await Y(t)).exists()?await be(t,{chatbotQueries:nt(1)}):await tt(t,{date:ye(),pageViews:{},uniqueVisitors:1,chatbotQueries:1})}catch{}}const W=new _s,He={en:["About us","Contact info","Tribal outreach","Children's ministry","Our location"],te:["మా గురించి","సంప్రదింపు","గిరిజన సేవ","పిల్లల పరిచర్య","మా చిరునామా"]};function xs(){const[e,t]=d.useState(!1),[n,a]=d.useState([]),[i,r]=d.useState(""),[o,l]=d.useState(!1),[c,u]=d.useState(!1),m=d.useRef(null),f=d.useRef(null),{language:g,ts:h}=F();d.useEffect(()=>(W.init().then(()=>u(!0)),()=>W.destroy()),[]),d.useEffect(()=>{W.setLanguage(g)},[g]);const _=d.useCallback(p=>{a(w=>[...w,{id:Date.now()+Math.random(),role:"bot",text:p,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}])},[]);d.useEffect(()=>{e&&n.length===0&&c&&_(h("chatbot_greeting"))},[e,c,n.length,h,_]),d.useEffect(()=>{var p;(p=m.current)==null||p.scrollIntoView({behavior:"smooth"})},[n,o]),d.useEffect(()=>{e&&setTimeout(()=>{var p;return(p=f.current)==null?void 0:p.focus()},300)},[e]);const b=d.useCallback(async p=>{const w=(p||i).trim();if(!w)return;a(A=>[...A,{id:Date.now(),role:"user",text:w,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]),r(""),l(!0),ws(),await new Promise(A=>setTimeout(A,600+Math.random()*500));const se=W.respond(w);l(!1),_(se.text)},[i,_]);return s.jsxs("div",{className:"chatbot-widget",children:[s.jsxs("button",{className:`chatbot-fab ${e?"chatbot-fab--open":""}`,onClick:()=>t(p=>!p),"aria-label":e?"Close chat":"Open chat with Calvary Prema Assistant","aria-expanded":e,children:[e?s.jsx("span",{className:"chatbot-fab__x",children:"×"}):s.jsx(pe,{src:"/logo.svg",size:40,pulse:!0}),!e&&n.length===0&&s.jsx("span",{className:"chatbot-fab__badge",children:"1"})]}),s.jsxs("div",{className:`chatbot-window ${e?"chatbot-window--open":""}`,role:"dialog","aria-label":"Ministry Chat Assistant","aria-modal":"true",children:[s.jsxs("div",{className:"chatbot-header",children:[s.jsx(pe,{src:"/logo.svg",size:36,pulse:!1}),s.jsxs("div",{className:"chatbot-header__info",children:[s.jsx("div",{className:"chatbot-header__name",children:"Calvary Prema Assistant"}),s.jsxs("div",{className:"chatbot-header__status",children:[s.jsx("span",{})," Online"]})]}),s.jsx("button",{className:"chatbot-header__close",onClick:()=>t(!1),"aria-label":"Close chat",children:"×"})]}),s.jsxs("div",{className:"chatbot-messages",role:"log","aria-live":"polite",children:[n.map(p=>s.jsxs("div",{className:`chatbot-msg chatbot-msg--${p.role}`,children:[s.jsx("div",{className:"chatbot-msg__bubble",children:p.text}),s.jsx("div",{className:"chatbot-msg__time",children:p.time})]},p.id)),o&&s.jsx("div",{className:"chatbot-msg chatbot-msg--bot",children:s.jsxs("div",{className:"chatbot-typing",children:[s.jsx("span",{}),s.jsx("span",{}),s.jsx("span",{})]})}),s.jsx("div",{ref:m})]}),n.length<=1&&s.jsx("div",{className:"chatbot-quick-actions",children:(He[g]||He.en).map(p=>s.jsx("button",{className:"chatbot-quick-btn",onClick:()=>b(p),children:p},p))}),s.jsxs("div",{className:"chatbot-input-row",children:[s.jsx("input",{ref:f,className:"chatbot-input",type:"text",placeholder:h("chatbot_placeholder"),value:i,onChange:p=>r(p.target.value),onKeyDown:p=>{p.key==="Enter"&&!p.shiftKey&&(p.preventDefault(),b())},maxLength:300}),s.jsx("button",{className:"chatbot-send-btn",onClick:()=>b(),disabled:!i.trim(),"aria-label":h("chatbot_send"),children:"➤"})]})]})]})}function St({fullPage:e=!1,message:t="Loading..."}){return s.jsxs("div",{className:e?"loading loading--page":"loading",children:[s.jsx("div",{className:"loading__ring"}),s.jsx("div",{className:"loading__text",children:t})]})}function Is(){const e=fe(),[t,n]=d.useState(!0);return d.useEffect(()=>{n(!0);const a=setTimeout(()=>n(!1),2e3);return()=>clearTimeout(a)},[e.pathname]),s.jsx("div",{className:`page-loader ${t?"page-loader--visible":""}`,"aria-hidden":!t,children:s.jsxs("div",{className:"page-loader__cross","aria-label":"Loading",children:[s.jsx("span",{}),s.jsx("span",{})]})})}function Ts(){var r;const{globalSettings:e,contactPage:t}=je(),a=((e==null?void 0:e.phone)||(t==null?void 0:t.phone)||"81793 05085").replace(/[^\d]/g,""),i=((r=e==null?void 0:e.socialLinks)==null?void 0:r.whatsapp)||a;return s.jsxs("div",{className:"floating-contact","aria-label":"Quick contact actions",children:[s.jsx("a",{className:"floating-contact__btn floating-contact__btn--whatsapp",href:`https://wa.me/91${i.replace(/^91/,"")}`,target:"_blank",rel:"noopener noreferrer","aria-label":"Open WhatsApp",children:"WA"}),s.jsx("a",{className:"floating-contact__btn floating-contact__btn--call",href:`tel:+91${a.replace(/^91/,"")}`,"aria-label":"Call ministry",children:"Call"})]})}function js({children:e}){const{user:t,loading:n}=rs(),a=fe();return n?s.jsx(St,{fullPage:!0,message:"Checking authentication..."}):t?e:s.jsx(de,{to:"/admin/login",state:{from:a},replace:!0})}const As=d.lazy(()=>v(()=>import("./HomePage-BfBGUvRd.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12]))),Es=d.lazy(()=>v(()=>import("./AboutPage-qFBKqqfJ.js"),__vite__mapDeps([13,1,3,8,9,4,5,2,14]))),ks=d.lazy(()=>v(()=>import("./MinistriesPage-B7SWAUGi.js"),__vite__mapDeps([15,1,6,7,2]))),Rs=d.lazy(()=>v(()=>import("./TribalOutreachPage-DElNBs9o.js"),__vite__mapDeps([16,1,17,18,10,11,3,8,9,2]))),Ns=d.lazy(()=>v(()=>import("./ChildrensMinistryPage-BNg2BZjM.js"),__vite__mapDeps([19,1,17,18,10,11,3,8,9,2]))),Cs=d.lazy(()=>v(()=>import("./GalleryPage-Cq6VAHP-.js"),__vite__mapDeps([20,1,17,18,8,9,2]))),Ps=d.lazy(()=>v(()=>import("./ContactPage-D6w_6TeM.js"),__vite__mapDeps([21,1,2,3,8,9,22]))),Os=d.lazy(()=>v(()=>import("./NotFoundPage-D3gJE1G9.js"),__vite__mapDeps([23,1,2]))),Ss=d.lazy(()=>v(()=>import("./AdminLogin-BTYNImVe.js"),__vite__mapDeps([24,1,2,25]))),Ls=d.lazy(()=>v(()=>import("./AdminDashboard-CbMZlJ2f.js"),__vite__mapDeps([26,1,2,27]))),Ds=d.lazy(()=>v(()=>import("./AdminHome-BX-NbEMV.js"),__vite__mapDeps([28,1,29,2]))),Ms=d.lazy(()=>v(()=>import("./AdminPages-DZmsjy1C.js"),__vite__mapDeps([30,1,2,31,32,29,33]))),$s=d.lazy(()=>v(()=>import("./AdminGallery-CTgoqRP9.js"),__vite__mapDeps([34,1,2,31]))),Fs=d.lazy(()=>v(()=>import("./AdminFestivalBanner-CN7tYqSl.js"),__vite__mapDeps([35,1,2,31]))),Us=d.lazy(()=>v(()=>import("./AdminChatbot-C4Pk8ft_.js"),__vite__mapDeps([36,1,2]))),qs=d.lazy(()=>v(()=>import("./AdminMessages-DPdBxgJr.js"),__vite__mapDeps([37,1,2]))),Vs=d.lazy(()=>v(()=>import("./AdminAnalytics-BqqwDnO1.js"),__vite__mapDeps([38,1,29,2]))),Bs=d.lazy(()=>v(()=>import("./AdminSettings-CrA5kuoM.js"),__vite__mapDeps([39,1,2,31,32])));function R({children:e}){return s.jsxs(s.Fragment,{children:[s.jsx(Is,{}),s.jsx(fs,{}),s.jsx("div",{className:"main-content",children:e}),s.jsx(gs,{}),s.jsx(ms,{}),s.jsx(xs,{}),s.jsx(Ts,{})]})}function Gs(){return s.jsx(is,{children:s.jsx(us,{children:s.jsx(ls,{children:s.jsx(Mt,{children:s.jsx(d.Suspense,{fallback:s.jsx(St,{fullPage:!0}),children:s.jsxs($t,{children:[s.jsx(y,{path:"/",element:s.jsx(R,{children:s.jsx(As,{})})}),s.jsx(y,{path:"/about",element:s.jsx(R,{children:s.jsx(Es,{})})}),s.jsx(y,{path:"/ministries",element:s.jsx(R,{children:s.jsx(ks,{})})}),s.jsx(y,{path:"/tribal-outreach",element:s.jsx(R,{children:s.jsx(Rs,{})})}),s.jsx(y,{path:"/childrens-ministry",element:s.jsx(R,{children:s.jsx(Ns,{})})}),s.jsx(y,{path:"/gallery",element:s.jsx(R,{children:s.jsx(Cs,{})})}),s.jsx(y,{path:"/contact",element:s.jsx(R,{children:s.jsx(Ps,{})})}),s.jsx(y,{path:"/admin/login",element:s.jsx(Ss,{})}),s.jsxs(y,{path:"/admin",element:s.jsx(js,{children:s.jsx(Ls,{})}),children:[s.jsx(y,{index:!0,element:s.jsx(de,{to:"/admin/dashboard",replace:!0})}),s.jsx(y,{path:"dashboard",element:s.jsx(Ds,{})}),s.jsx(y,{path:"pages",element:s.jsx(Ms,{})}),s.jsx(y,{path:"gallery",element:s.jsx($s,{})}),s.jsx(y,{path:"banner",element:s.jsx(Fs,{})}),s.jsx(y,{path:"chatbot",element:s.jsx(Us,{})}),s.jsx(y,{path:"messages",element:s.jsx(qs,{})}),s.jsx(y,{path:"analytics",element:s.jsx(Vs,{})}),s.jsx(y,{path:"settings",element:s.jsx(Bs,{})})]}),s.jsx(y,{path:"/admin/*",element:s.jsx(de,{to:"/admin",replace:!0})}),s.jsx(y,{path:"*",element:s.jsx(R,{children:s.jsx(Os,{})})})]})})})})})})}he.createRoot(document.getElementById("root")).render(s.jsx(Ke.StrictMode,{children:s.jsx(Gs,{})}));export{ze as D,je as a,F as b,S as d,s as j,Ks as t,rs as u};
