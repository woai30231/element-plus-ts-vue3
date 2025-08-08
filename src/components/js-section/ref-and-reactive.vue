<template>
    <div>
        <h2><el-title>递归创建一个es6 Proxy对象</el-title></h2>
        <p>
            相对于递归创建一个proxy，我先来实现一个不递归创建的Proxy对象，代码如下：
        </p>
        <div class="code-block">
            <pre>
                <code>
                    function createProxy(obj){
                        return new Proxy(obj,{
                            get(target,key){
                                console.log("监听到正在读值操作：target->"+target+',key->'+key)
                                return target[key];
                            },
                            set(target,key,value){
                                console.log("监听到正在写值操作：target->"+target+',key->'+key)
                                target[key] = value;
                            }
                        })
                    }
                </code>
            </pre>
        </div>

        <p>看一下调用效果：</p>
        <div class="code-block">
            <pre>
                <code>
                    > const o = {name:'obj','msg':{hobby:'看书',age:20}}
                    undefined
                    > const o1 = createProxy(o)
                    undefined
                    > o1.name
                    监听到正在读值操作：target->[object Object],key->name
                    'obj'
                    > o1.name = 'newname'
                    监听到正在写值操作：target->[object Object],key->name
                    'newname'
                    > o1.msg.hobby
                    监听到正在读值操作：target->[object Object],key->msg
                    '看书'
                    > o1.msg.hobby = '爬山'
                    监听到正在读值操作：target->[object Object],key->msg
                    '爬山'
                    > 
                </code>
            </pre>
        </div>
        <p>
            我们可以看到无论是新赋值或者读取深层次属性，只能监听到顶层属性的读写操作！这就会有问题了，如果我们通过es6解构的话，那么深层次的属性就不是个proxy对象，就无法监听读写操作，如下：
        </p>
        <div class="code-block">
            <pre>
                <code>
                    > const {msg} = o1
                    监听到正在读值操作：target->[object Object],key->msg
                    undefined
                    > msg.hobby
                    '爬山'
                    > 
                </code>
            </pre>
        </div>
        <p>所以如果我们将来希望创建的代理对象内部所有属性将来解构出去的时候依然能监听读写操作，那么就需要深层次创建proxy的方法，于是写了一个方法如下：</p>
        <div class="code-block">
            <pre>
                <code>
                    function deepCreateProxy(obj){
                        for(let key in obj){
                        if(typeof obj[key] == 'object'){
                            obj[key] = deepCreateProxy(obj[key]);
                        }
                        };
                        return new Proxy(obj,{
                            get(target,key){
                                console.log("监听到正在读值操作：target->"+target+',key->'+key)
                                return target[key];
                            },
                            set(target,key,value){
                                console.log("监听到正在写值操作：target->"+target+',key->'+key)
                                target[key] = value;
                            }
                        })
                    };
                </code>
            </pre>
        </div>
        <p>我们再看一下效果：</p>
        <div class="code-block">
            <pre>
                <code>
                    > const o2 = deepCreateProxy(o)
                    undefined
                    > o2.name
                    监听到正在读值操作：target->[object Object],key->name
                    'newname'
                    > o2.name = 'new-o2-name'
                    监听到正在写值操作：target->[object Object],key->name
                    'new-o2-name'
                    > o2.msg.hobby = '游泳'
                    监听到正在读值操作：target->[object Object],key->msg
                    监听到正在写值操作：target->[object Object],key->hobby
                    '游泳'
                    > o2.msg.hobby
                    监听到正在读值操作：target->[object Object],key->msg
                    监听到正在读值操作：target->[object Object],key->hobby
                    '游泳'
                    > const {msg:msg1} = o2
                    监听到正在读值操作：target->[object Object],key->msg
                    undefined
                    > msg1.hobby
                    监听到正在读值操作：target->[object Object],key->hobby
                    '游泳'
                    > msg1.hobby = '游戏'
                    监听到正在写值操作：target->[object Object],key->hobby
                    '游戏'
                    > 
                </code>
            </pre>
        </div>
        <p>发现现在解构出来依然是个代理对象，能监听读写操作！这能做什么呢？这里类比vue3中的reactive创建的响应式对象，如果解构出深层次的对象依然是个响应式对象，可以直接用属性达到响应效果，但是前提是这个属性是引用值哈！</p>
        <p>如果是解构出来是基础类值的话，那么就要用toRefs包一下，返回一个带value属性的响应对象。</p>
    </div>
</template>
<style scoped>
.code-block{
    background-color: #2c3e50;
    color: #ecf0f1;
    padding:10px;
    code ,pre{
        padding:0px;
    }
}
</style>