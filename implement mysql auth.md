25 May I heard the news thant Deno had been released formally. So I decided to have a try. 

My plan is simple.Just build a simple server which can expose a single api and can persist data to database. [this](https://github.com/Demo-of-Arbitrary/Deno) is my demo repository. I almost got there, but when I tried to use mysql with `deno-mysql` I got trouble. 

Since I already have two stranger friends: `Deno` and `typescript`, I heard a lot about `typescript`, but didn't got chance to practice in my own project. Now I have to handle `Mysql` stuff. I barely learn some `mysql` at the first time I learnt coding by myself, about 6 years ago. So I had to go through the mysql document and some books of basic mysql knowledge, as well as wrote down some notes.

After those quick learning, I can setup a mysql server and execute simple sql. Next I tried to connect to the mysql server through `deno-mysql`. But it refused to work although I had followed every step. Then I had to go through the issue of `deno-mysql`'s repo. Then I found an explanation that `deno-mysql` can't support `caching_sha2_password` which become the default auth plugin since mysql 8.0. Then I go back to check my mysql version. It's 8.0. It's very unlucky.

I should stopped at there, but somehow, an idea hit me that why don't I help to contribute to the `deno-mysql` repo to implement the function of supporting the `caching_sha2_password` authentication mechanism. I didn't know what a big task that will be. I just started.

I started from reading the source code of the `deno-mysql`. It's not difficult to me because I'm an experienced front end developer. Quickly I thought I found out the problem, the author did "complete" the `caching_sha2_password` but he comment that part of code. I don't know why, just try to uncomment them to see how it will go.

It turned out that I was too optimistic. That doesn't work, and what's worse I was trapped. I didn't know how to do it because lack of related knowledge. I did have an idea, to inspect the network. But I wasn't familiar with capture tool such as `wireshark`. I used it severally but hadn't grasp it well. I

Then I decided to turn to learn `wireshark` and went back later. I read some books and online articles. I finally figure out what the packets represented, only for the tcp handshake and disconnect. But there were some others packets I totally had no ideas.

I guess them about the mysql protocol. I google and found the mysql official documents,and read the protocol part. I had to say, this part is different to me. Because this was the first time I handle protocol related stuff. It's abstract and without detailed example. 
Then when I tried to program, it became worse. Because I didn't  handled Binary stuff. I had to learn that part also. I know binary but it's difficult to use them to real scenery. 

I learnt a lot new stuff in this process. I had to test and verified and read the official documents again and again. Because I have bad habit of skip often when reading. I always missed the key point and have to go back when I suffered trouble. Stupid me. And the most lesson I learnt is asking people. If you want to solve every problem by yourself, you will just push yourself crash. It's not shame admit people smart than you.

I learn these knowledge:

1. mysql protocol's packet structure, the first 3 bytes is the length, the 4th is sequence id. 
2. mysql handshake preprocess. the document had detailed explained, but I missed it at first. Finally google bring me back to there :)
3. the big endian and little endian when storage and transport binary. I never heard it before.
4. the RSA encryption. For grasp this I read two books, learn a lot. `C = P^3 mod n`, encryption is just math.
5. I also learn encode and decode. Although we say encrypt these texts, but computer refused to storage them, it persist them as binary. so we need encode system, such as `ascii` `unicode`. I had deeper understanding of encode.

But I was trapped here again. Because I found there is no deno lib to encrypt like `crypto` in nodejs. I felt desperate. I thought I should quit. Because I had spent too much time on this. But I knew, if i quit i will got nothing. All I learnt I will forget them. If I can't make a thing, that's same as I did noting. 

So I went on. I ask help. some one give me idea to use js lib `jsencrypt`. I tried but it didn't support RSA's `oaep` padding. I decide to turn to RSA. Because I knew Deno was written by `Rust`. Like nodejs can use c++ lib, deno should can use `Rust` lib also.

Again I stepped into a totally strange area. I would never do that any more. I tried to learnt `Rust` from scratch and  I got many trouble. Never involved so many thing you totally not know. 

At last I made it. I used the deno bridge to adapt rust's `RSA` crate. and i also happened to find a js lib `forge` it works well. I got two availabl options. I choose the `forge`.

I almost success.I had a lib `node-mysql2`. I ref this lib. It help me do things smoothly. But at last step, I encrypt the password with public key, mysql server still cant handshake with my code. Again I thought I should quit. Because I thought I almost do exactly every step as `node-mysql`. But I didn't quit. That's me, never gave up. I again compare my code with `node-mysql2`. And analyze the packets with wireshark. Then modify one factor and verified. I believe exclude every impossible, the left one is the truth.

Finally i solved the problem. It's encode problem.

I make a pr to the `deno-mysql` at last. At that moment, I felt endless happy.