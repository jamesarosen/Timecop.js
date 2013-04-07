require 'rake/tasklib'

module Timecop

  class JSHintTask < Rake::TaskLib

    attr_accessor :name, :files, :executable, :config, :marker_file

    def initialize(name)
      @name         = name
      @files        = []
      @executable   = nil
      @config       = nil
      @marker_file  = nil
      yield self if block_given?
      define
    end

    def define
      CLEAN << marker_file

      task name => marker_file

      file marker_file => [ *files, executable, config ] do
        sh executable, *files, '--config', config do |ok, res|
          fail 'JSHint found errors.' unless ok
        end

        mkdir_p File.dirname(marker_file)
        touch marker_file
      end
    end

  end

end
