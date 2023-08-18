# main.py
from flask import Flask, render_template


app = Flask(__name__, static_folder='static')



# 主页
@app.route('/')
def home():
 title = '知琴艺术工坊'
 content = '''
 <p>欢迎来到知琴艺术工坊！</p>
 <p>这里是一个充满艺术氛围的地方，灵感源自莎士比亚的诗意和戏剧。</p>
 <p>在知琴艺术工坊中，我们追求优雅、美丽和独特的艺术风格。</p>
 <p>通过绘画、创作和艺术交流，我们致力于创造智能、清丽和典雅的艺术作品。</p>
 <p>欢迎您探索知琴艺术工坊，发现艺术与美的无尽可能。</p>
 '''
 return render_template('home.html', title=title, content=content)

# 产品服务
@app.route('/products')
def products():
 return render_template('products.html')

# 画廊
@app.route('/gallery')
def gallery():
 return render_template('gallery.html')

# 技术支持与服务
@app.route('/support')
def support():
 return render_template('support.html')

# 关于我们
@app.route('/about')
def about():
 return render_template('about.html')


if __name__ == '__main__':
 app.run(debug=True)
