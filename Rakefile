# Build-related information:

require 'json'
require 'pathname'

project_root = Pathname.new File.expand_path(File.dirname(__FILE__))
timecop_version = JSON.parse(File.read(project_root.join('package.json')))['version']

lib_dir = project_root.join('lib')
lib_files = [ 'Timecop', 'MockDate', 'TimeStackItem' ].map do |f|
  lib_dir.join("#{f}.js").to_s
end

tmp_dir   = project_root.join('tmp')
tmp_dist  = tmp_dir.join('timecop.js').to_s

dist_file = project_root.join("timecop.js").to_s

# Tasks:

task :default => :test

require 'rake/clean'
CLEAN << tmp_dir

directory tmp_dir.to_s

desc "Run tests on the compiled Timecop library"
task :test => :jshint do
  sh "bundle exec jasmine-headless-webkit" do |ok, res|
    fail "Test failures" unless ok
  end
  puts "Tests passed"
end

namespace :jshint do
  jshint_executable = project_root.join('node_modules', 'jshint', 'bin', 'jshint')

  file jshint_executable do
    sh 'npm', 'install'
  end

  jshint_config = project_root.join('.jshintrc').to_s

  task :check_source => [ *lib_files, jshint_config, jshint_executable ] do
    sh 'jshint', *lib_files, '--config', jshint_config do |ok, res|
      fail 'JSHint found errors in source.' unless ok
    end
  end

  task :check_tmp_dist => [ tmp_dist, jshint_config, jshint_executable ] do
    sh 'jshint', tmp_dist, '--config', jshint_config do |ok, res|
      fail 'JSHint found errors in compiled output.' unless ok
    end
  end

  task :check => [ 'jshint:check_source', 'jshint:check_tmp_dist' ] do
    puts "JSHint checks passed"
  end
end

desc 'Run JSHint checks against JavaScript'
task :jshint => 'jshint:check'

template_file = lib_dir.join('BuildTemplate.js')

file tmp_dist => [ *lib_files, tmp_dir, template_file ] do
  template = File.read(template_file)

  contents = lib_files.
              map { |f| File.read(f) }.
              join("\n\n")

  compiled = template.
              sub('{{ TIMECOP_VERSION }}', timecop_version).
              sub('{{ TIMECOP_LIBRARIES }}', contents)

  File.open(tmp_dist, 'w') { |f| f.write(compiled) }

  puts("Wrote #{tmp_dist}");
end

file dist_file => [ tmp_dist, 'test' ] do |t|
  cp t.prerequisites.first, t.name
end

desc "Compile #{dist_file} for release"
task :dist => dist_file
