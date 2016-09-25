Version 2 of the vocab proj
===========================

Project information and webpage can be found [here](http://teamjs.se.rit.edu), guidelines for contributing can be found in [CONTRIBUTING.md](CONTRIBUTING.md). Please read. This is currently being developed by an RIT senior project team, which may limit our willingness to accept external contributions, so please contact the team before starting any work on the project.

Issues are managed by [ZenHub](https://www.zenhub.com/), the main board that includes process can be found [here](https://github.com/teamdotjs/teamdotjs.github.io#boards?repos=66860551,67741560) (only works if ZenHub installed).

## Running the Rails API
1. Download [Ruby 2.3.1](https://www.ruby-lang.org/en/downloads/)
2. Download bundler: `gem install bundler`
3. Pull source code and and create file called .env in the root folder
    - Run `rails secret` twice
    - Copy these secrets into .env in this format:
    
        ```
        ENV['SECRET_KEY_BASE_DEV'] = '<<RAILS_SECRET1>>'
        ENV['SECRET_KEY_BASE_TEST'] = '<<RAILS_SECRET2>>'
        ```
4. Run `bundle`
5. Run `rake db:create`
6. Run `rails s` and go to [http://localhost:3000](http://localhost:3000) in the browser
