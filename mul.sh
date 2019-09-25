#!/bin/bash
function readJson {  
  UNAMESTR=`uname`
  if [[ "$UNAMESTR" == 'Linux' ]]; then
    SED_EXTENDED='-r'
  elif [[ "$UNAMESTR" == 'Darwin' ]]; then
    SED_EXTENDED='-E'
  fi; 

  VALUE=`grep -m 1 "\"${2}\"" ${1} | sed ${SED_EXTENDED} 's/^ *//;s/.*: *"//;s/",?//'`

  if [ ! "$VALUE" ]; then
    echo '' ;
  else
    echo $VALUE ;
  fi; 
}

base="/Users/lengjun/mycode/story"
baseCmd="npm start"
path=("/story-console" "/service/article-service" "/service/user-service" "/BFF/hub-bff") 
cmd=("npm start" "npm start" "")
for i in "${!path[@]}";   
do   
    p=${path[$i]}
    if test $base
    then
    p=$base${path[$i]}
    fi
    # 默认用cmd数组里的 如果没有 就用baseCmd
    c=${cmd[$i]}
    if [ ! "$c" ]
    then
    c=${baseCmd}
    fi
    cd $p;nohup ${c}
    NAME=`readJson package.json name`;
    PORT=`readJson package.json port`;
    printf "%s\t%s\t%s\t%s\n" "$PORT" "$NAME" "${c}" 
done
