import fs from 'node:fs';

const file = 'blogger/production/thebukitbesi.xml';
let xml = fs.readFileSync(file, 'utf8');
const original = xml;

function replaceOnce(label, pattern, replacement) {
  const next = xml.replace(pattern, replacement);
  if (next === xml) {
    console.log(`Skipped (target not found): ${label}`);
    return false;
  }
  xml = next;
  return true;
}

function replaceIfPresent(label, pattern, replacement) {
  const next = xml.replace(pattern, replacement);
  if (next !== xml) {
    xml = next;
    return true;
  }
  return false;
}

// Remove Microsoft Clarity: unnecessary third-party JS on every page.
replaceIfPresent(
  'remove Microsoft Clarity',
  /\s*<script type='text\/javascript'>\s*\(function\(c,l,a,r,i,t,y\)\{[\s\S]*?clarity\.ms\/tag\/[\s\S]*?<\/script>\s*/,
  '\n'
);

// Remove Reader Revenue Manager/SWG. This is not Google News verification.
replaceIfPresent(
  'remove Google SWG/RRM',
  /\s*<script async='async' src='https:\/\/news\.google\.com\/swg\/js\/v1\/swg-basic\.js'\/>[\s\S]*?<\/script>\s*/,
  '\n'
);

// Always render the theme share UI on post pages; do not depend on Blogger byline settings.
xml = xml.replaceAll(
  "<b:include cond='data:view.isPost and data:allBylineItems.share' data='post' name='postShareButtons'/>",
  "<b:include cond='data:view.isPost' data='post' name='postShareButtons'/>"
);

// Do not claim WebP when Blogger may return JPEG/PNG after resizeImage().
xml = xml.replaceAll("              <meta content='image/webp' property='og:image:type'/>\n", '');

// Mobile-fit, footer compaction, CLS guards, and accessible controls.
const cssPatch = `
/* TBB 2026.07 mobile-fit + performance patch */
html,body{max-width:100%;overflow-x:hidden}
img,svg,video,iframe{max-width:100%}
.post-body img{height:auto}
.share-a .sl,.share-toggle,.to-top,.menu-toggle,.search-toggle,.darkmode-toggle{min-width:44px;min-height:44px}
.entry-thumbnail,.thumbnail,.popular-posts .post{contain:layout paint}
img.thumbnail, img.avatar {object-fit:cover;width:100%;height:100%}
img.thumbnail, img.avatar {opacity:1 !important}
.article-ads:empty,.before-ads:empty,.after-ads:empty,.post-footer-ads:empty{display:none!important;min-height:0!important;margin:0!important;padding:0!important}
ins.adsbygoogle[data-ad-status='unfilled']{display:none!important;min-height:0!important;margin:0!important}
.site-footer .footer{padding-top:2rem;padding-bottom:1.25rem}
.site-footer .widget{margin-bottom:1.5rem}
.footer-info .logo img,.footer-logo img{max-width:220px;height:auto}
.footer .social{margin-top:1rem}
.footer .social a{min-width:44px;min-height:44px}
.footer .label-list,.footer .cloud-label{gap:.5rem}
.footer .label-list a,.footer .cloud-label a{min-height:38px;padding:.5rem .75rem}
@media (max-width:767px){
  :root{--mobile-gutter:14px}
  .container,.content-wrap,.main-inner,.header-inner,.footer .container,.footer-bar .container{width:100%;max-width:100%;padding-left:var(--mobile-gutter)!important;padding-right:var(--mobile-gutter)!important}
  .main-logo img{max-width:min(56vw,250px);height:auto}
  .blog-posts,.blog-post,.post-body,.entry-content,.sidebar .widget,.content-section .widget{max-width:100%;min-width:0}
  .post-body{overflow-wrap:anywhere;word-break:normal}
  .post-body table{display:block;max-width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}
  .post-body pre{max-width:100%;overflow:auto}
  .popular-posts .post:first-child .entry-title{font-size:clamp(1.25rem,6vw,1.75rem);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .popular-posts .post:not(:first-child) .entry-title{font-size:1rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  .popular-posts .entry-thumbnail{flex:0 0 34%;max-width:34%}
  .site-footer .footer{padding-top:1.75rem;padding-bottom:1rem}
  .footer-info,.footer .widget-content{max-width:100%}
  .footer-bar{padding-block:1rem}
  .footer-bar ul{display:flex;flex-wrap:wrap;justify-content:center;gap:.75rem 1.25rem}
  .footer-bar li{margin:0!important}
  .newsletter input,.newsletter button{min-height:48px}
  .to-top{right:var(--mobile-gutter);bottom:calc(16px + env(safe-area-inset-bottom))}
}
`;
if (!xml.includes('TBB 2026.07 mobile-fit')) {
  replaceOnce('inject mobile CSS patch', ']]></b:skin>', `${cssPatch}\n]]></b:skin>`);
}

// Native Web Share enhancement and robust copy fallback, no jQuery required.
const vanillaShare = `
<script type='text/javascript'>
//<![CDATA[
(function(){
  'use strict';
  function ready(fn){document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn,{once:true}):fn();}
  ready(function(){
    document.querySelectorAll('.post-share a,.post-share button').forEach(function(el){
      if(!el.getAttribute('aria-label')){
        var text=(el.textContent||el.title||'Kongsi artikel').trim();
        el.setAttribute('aria-label',text||'Kongsi artikel');
      }
    });
    document.querySelectorAll('.share-toggle').forEach(function(btn){
      if(!navigator.share)return;
      btn.addEventListener('click',function(ev){
        var title=document.title;
        var url=location.href;
        navigator.share({title:title,text:title,url:url}).catch(function(){});
      });
    });
    document.querySelectorAll('.copy-link button').forEach(function(btn){
      btn.addEventListener('click',function(){
        var input=btn.parentElement&&btn.parentElement.querySelector('input');
        var value=input?input.value:location.href;
        if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(value).catch(function(){});}
        else if(input){input.select();document.execCommand('copy');}
      });
    });
  });
})();
//]]>
</script>`;
if (!xml.includes('Kongsi artikel')) {
  replaceOnce('inject vanilla share enhancement', '</body>', `${vanillaShare}\n</body>`);
}

if (xml === original) {
  console.log('No changes applied (migration already up to date).');
} else {
  fs.writeFileSync(file, xml);
  console.log('Applied mobile performance, share, OG and layout refresh.');
}
