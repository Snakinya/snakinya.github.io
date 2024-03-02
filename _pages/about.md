---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>
I am currently a visiting student at National University of Singapore, advised by Prof.[Zhenkai Liang](https://www.comp.nus.edu.sg/~liangzk/). I am a core member of the CTF team 0x401.

My research pursuits revolve around network security, with a primary focus on Content Delivery Network (CDN) security and protocol security. My current work aims to discover and solve the security risks posed by CDN forwarding request inconsistencies to build safer, better CDNs. My research results have received acknowledgements from well-known CDN vendors such as Cloudflare, Azure, Aliyun, Cachefly, Qiniu, and Upyun.

<font color=red>I am currently looking for a PhD position in 25 Fall.</font>

# 🔥 News
- 2024.03:  🎉🎉 Our paper “CDN Cannon: Exploiting CDN Back-to-Origin Strategies for Amplification Attacks” was accepted by Usenix Security, Philadelphia, PA, 2024.

# 📝 Publications 
- CDN Cannon: Exploiting CDN Back-to-Origin Strategies for Amplification Attacks ![](https://img.shields.io/badge/CCF-A-red?style=flat-square) ![](https://img.shields.io/badge/USENIX%20Security-2024-blue?style=flat-square)
  - Ziyu Lin, **Zhiwei Lin**, Ximeng Liu, Jianjun Chen, Run Guo, Cheng Chen, Shaodong Xiao
  - The 33rd USENIX Security Symposium
  - This paper is about exploiting CDN Back-to-Origin strategies to launch a new class of amplification attacks.


# 📖 Educations
- *2024.01 - Present*, National University of Singapore, Visiting scholar
- *2020.09 - Present*, Sichuan University, Undergraduate





# 💻 Internships
- *2023.08 - 2023.10*, QI-ANXIN Technology Company, Security Research Intern.
- *2023.03 - 2023.10*, NISL at Tsinghua University, Research Intern.

# 🎖 Honors and Awards
- **1st Prize**, 2023 National College Student Information Security Contest (National Finals CTF)
- **1st Prize**, 2023 National College Student Information Security Contest (Southwest Division CTF)
- **3rd Prize**, 2022 "Qiangwang Cup" National Cyber Security Contest (National Online Finals)
- **3rd Prize**, 2022 D^3CTF (International Finals)

# 📚 CVEs
- CVE-2023-51770
- CVE-2023-46227
- CVE-2023-41578
- CVE-2023-42268
- ...
