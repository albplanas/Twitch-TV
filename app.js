var Streamers=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function Stream(name,id){
   this.id
   this.name=name;
   this.line='';
   this.link_chanel='';
};
var line,link_chanel;
var first=new Array(8);
var sec=new Array(8);
first.fill(0);
sec.fill(0);

 $(document).ready(function() { 

   
                    

  var Request=function(i,type){
     var name=Streamers[i];
     var html='https://wind-bow.gomix.me/twitch-api/channels/'+name+'?callback=?';
     
             $.getJSON(html, function(json) {
                 console.log(json);
                    if(json.status===null && type!=='online'){
                         line='offline';
                         link_chanel=json.url;//arreglar esto

                         str_html='<div id="box-0"  class="container parent" ><a href="'+link_chanel+'" class="float-left-child">'+name+'</a><p class="float-right-child offlines">'+line+'</p></div><div class="separator"></div>';
                         newhtml=str_html.replace('box-0','box-'+i);

                              if(first[i]===0){
                                 $( "#all-chanels" ).before(newhtml);
                                 }
                              if(first[i]===1){
                                 $( "#box-"+i ).html('<a href="'+link_chanel+'" class="float-left-child">'+name+'</a><p class="float-right-child offlines">'+line+'</p>');
                                 $('#box-'+i).css({"display":"block"}); 
                                 }   

                             first[i]=1;  
                     }

                     if(json.status!==null && type!=='offline'){
                         line='online';
                         
                         var language=json.language;
                         var game=json.game;
                         var status=json.status;
                         link_chanel=json.url;
                         str_html='<div id="box-0" ><div   class="container parent" ><a href="'+link_chanel+'" class="float-left-child">'+name+'</a><p class="float-right-child onlines">'+line+'</p></div><ul  class="info"><li>'+game+'</li><li>'+status+'</li><li>language:'+language+'</li></ul><div class="separator"></div></div>';
                         newhtml=str_html.replace('box-0','box-'+i);
                 
                        
                           if(first[i]===0){
                                 $( "#all-chanels" ).before(newhtml);
                                 }
                              if(first[i]===1){
                                 $( "#box-"+i ).html('<div   class="container parent" ><a href="'+link_chanel+'" class="float-left-child">'+name+'</a><p class="float-right-child onlines">'+line+'</p></div><ul id="info"'+i+' class="info"><li>'+game+'</li><li>'+status+'</li><li>language:'+language+'</li></ul><div class="separator"></div>');
                                 $('#box-'+i).css({"display":"block"}); 
                                 }

                             first[i]=1;
                             
                      }

             });
             
             }
             var Reset=function(){
                    $( "#all-chanels" ).empty();
                    for(var j=0;j<8;j++){
                         if(first[j]===1){
                            
                             $('#box-'+j).css({"display":"none"}); 
                         }
            }

         }
         $('#All').on('click',function(){
             
             $('#All').addClass("btn-danger");
             $('#Offline').removeClass("btn-danger");
             $('#Online').removeClass("btn-danger");
             Reset();
             Run('all');
         });

          $('#Offline').on('click',function(){
             
             $('#Offline').addClass("btn-danger");
             $('#All').removeClass("btn-danger");
             $('#Online').removeClass("btn-danger");
             Reset();
             Run('offline');
         });
         
         $('#Online').on('click',function(){
             
             $('#Online').addClass("btn-danger");
             $('#All').removeClass("btn-danger");
             $('#Offline').removeClass("btn-danger");
             Reset();
             Run('online');
         });


         var Run=function(type){
             for(var j=0;j<8;j++){
                 Request(j,type);

            }
         }
        

 });
