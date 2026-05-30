---
title: "Llama3大模型本地部署指南"
sidebar_position: 1
---

## 简介

项目地址：[https://github.com/ymcui/Chinese-LLaMA-Alpaca-3](https://github.com/ymcui/Chinese-LLaMA-Alpaca-3)

该项目基于Meta最新发布的新一代开源大模型[Llama-3](https://github.com/facebookresearch/llama3)开发，是Chinese-LLaMA-Alpaca开源大模型相关系列项目（[一期](https://github.com/ymcui/Chinese-LLaMA-Alpaca)、[二期](https://github.com/ymcui/Chinese-LLaMA-Alpaca-2)）的第三期。项目开源了**中文Llama-3基座模型和中文Llama-3-Instruct指令精调大模型**。这些模型在原版Llama-3的基础上使用了大规模中文数据进行增量预训练，并且使用精选指令数据进行精调，进一步提升了中文基础语义和指令理解能力，相比二代相关模型获得了显著性能提升。

这里我们需要下载的是GGUF格式的模型文件

GGUF是一种二进制格式文件的规范，**原始的大模型预训练结果经过转换后变成GGUF格式可以更快地被载入使用，也会消耗更低的资源**。原因在于GGUF采用了多种技术来保存大模型预训练结果，包括采用紧凑的二进制编码格式、优化的数据结构、内存映射等。因此采用相应的工具将原始模型预训练结果转换成GGUF之后可以更加高效的使用。

## 环境配置

### **Ollama**

**Ollama是**一个轻量级且可扩展的框架，通过提供命令行界面，可以帮助用户在本地电脑上运行、创建和管理大语言模型（LLMs），整体感觉和Docker很像。

项目地址：[https://ollama.com/download](https://ollama.com/download)

### **Ollama-webui**

对应的前端界面，github下载安装即可

```
git clone https://github.com/ollama-webui/ollama-webui-lite.git
cd ollama-webui-lite
npm install
npm run dev
```

启动之后如下

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/142356518/1718767433040-6d3bd0df-4bef-4651-a35f-822cc5742487.png)

## 模型部署

进入模型文件夹，创建Modelfile文件，用于配置ollama模型，定义了模型路径，聊天模板等信息。文件内容为

```
FROM ./ggml-model-q8_0.gguf

TEMPLATE """{{ if .System }}<|start_header_id|>system<|end_header_id|>
{{ .System }}<|eot_id|>{{ end }}{{ if .Prompt }}<|start_header_id|>user<|end_header_id|>
{{ .Prompt }}<|eot_id|>{{ end }}<|start_header_id|>assistant<|end_header_id|>
{{ .Response }}<|eot_id|>"""
SYSTEM """You are a helpful assistant. 你是一个乐于助人的助手。"""

PARAMETER stop "<|start_header_id|>"
PARAMETER stop "<|end_header_id|>"
PARAMETER stop "<|eot_id|>"
PARAMETER stop "<|reserved_special_token"
```

之后进行模型转换

```
ollama create llama3-chinese-inst-v3 -f Modelfile
```

当然，你也可以直接使用ollama上已经制作好的模型：

[https://ollama.com/scomper/llama3-zh-inst](https://ollama.com/scomper/llama3-zh-inst)

```
ollama pull scomper/llama3-zh-inst
```

之后直接启动webui或者命令行执行run即可

```
ollama run scomper/llama3-zh-inst
```

运行效果如下

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/142356518/1718774609228-5c0a4ab0-083f-4a40-9dbe-1967ad415281.png)

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/142356518/1718774578201-963d7b21-e8e1-451b-98be-f7524e55d209.png)

同样的，我们也可以用这种方式去部署qwen2等模型

qwen2地址：[https://ollama.com/library/qwen2](https://ollama.com/library/qwen2)

## 小结

最终经过对比测试，目前在本机部署qwen-1.5-14b-chat效果最优，根据排行榜能够与gpt3.5效果持平

![](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/142356518/1718935794844-b4d6e9bf-9e54-469c-a06e-de438097c9ca.png)

部署同样直接拉取镜像即可

```
ollama pull qwen:14b-chat
```

 ![](https://intranetproxy.alipay.com/skylark/lark/0/2024/png/142356518/1718935922215-e19a5902-b9d7-4746-903c-25801fbb145b.png)



